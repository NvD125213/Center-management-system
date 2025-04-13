import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AuthType, LoginType } from "../Types/authType";
import { UserType } from "../Types/userType";
import { sendEmailOTP } from "../middlewares/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export interface LogoutRequest extends Request {
  user?: UserType;
}

const tokenBlacklist = new Set();

export const AuthController = {
  register: async (
    req: Request<{}, {}, AuthType>,
    res: Response
  ): Promise<any> => {
    try {
      const { full_name, phone_number, email, password } = req.body;
      if (
        await prisma.user.findUnique({
          where: {
            email,
            phone_number,
          },
        })
      ) {
        return res.status(409).json({
          message: "Email or phone already exists",
        });
      }
      // Băm mật khẩu ra
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          password: hashPassword,
        },
      });

      return res.status(201).json({
        message: "User created successfully!",
        user: newUser,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },

  login: async (
    req: Request<{}, {}, AuthType>,
    res: Response
  ): Promise<any> => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    if (user.role === 1 || user.role === 2) {
      await sendEmailOTP({ email, id: user.id }, res);
    }

    // Xóa refresh token cũ trước khi tạo mới
    await prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { subject: "accessApi", expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { subject: "refreshToken", expiresIn: "7d" }
    );

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    return res.status(200).json({
      message: "Login successfully",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  },

  refreshToken: async (
    req: Request<{}, {}, LoginType>,
    res: Response
  ): Promise<any> => {
    const { refreshToken } = (req as any).body;

    if (!refreshToken) {
      return res.status(403).json({
        message: "Refresh token not found",
      });
    }

    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!
      ) as jwt.JwtPayload;

      const userRefreshToken = await prisma.refreshToken.findUnique({
        where: {
          token: refreshToken,
        },
      });

      if (!userRefreshToken) {
        return res.status(401).json({
          message: "Refresh token invalid or expired",
        });
      }

      // Xóa refresh token cũ
      await prisma.refreshToken.delete({
        where: {
          id: userRefreshToken.id,
        },
      });

      const accessToken = jwt.sign(
        {
          id: decodedRefreshToken.id,
          role: decodedRefreshToken.role,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        {
          subject: "accessApi",
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "New access token issued successfully",
        access_token: accessToken,
      });
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: "Session expired",
        });
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: "Refresh token không hợp lệ",
        });
      }

      return res.status(500).json({
        message: err.message,
      });
    }
  },

  logout: async (req: LogoutRequest, res: Response): Promise<any> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token not found" });
      }

      const accessToken = authHeader.split(" ")[1];
      const refreshToken = req.body.refreshToken;

      if (!accessToken || !refreshToken) {
        return res.status(400).json({ message: "Token missing" });
      }

      // 1. Blacklist accessToken nếu cần
      tokenBlacklist.add(accessToken);

      // 2. Tìm và xoá refresh token khỏi DB
      const userRefreshToken = await prisma.refreshToken.findUnique({
        where: {
          token: refreshToken,
        },
      });

      if (userRefreshToken) {
        await prisma.refreshToken.delete({
          where: {
            id: userRefreshToken.id,
          },
        });
      }

      res.clearCookie("refreshToken");
      return res.json({ message: "Logout successful" });
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  verifyOtp: async (req: LogoutRequest, res: Response): Promise<any> => {
    try {
      const { otp, userId } = req.body;
      if (!otp || !userId) {
        return res.status(422).json({
          message: "Empty Otp detail not allowed",
        });
      }
      const userOtpVerify = await prisma.userVerifyOtp.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!userOtpVerify) {
        return res.status(401).json({
          message:
            "Account doesn't exists. Please sign up or sign in account valid",
        });
      }
      const expiredAt = userOtpVerify.expiredAt;
      const hashedOtp = userOtpVerify.otp;
      if (expiredAt.getTime() < Date.now()) {
        await prisma.userVerifyOtp.deleteMany({
          where: {
            userId: userId,
          },
        });
        return res.status(401).json({
          message: "Otp expired. Please request again",
        });
      } else {
        const validOtp = await bcrypt.compare(otp, hashedOtp);
        if (!validOtp) {
          return res.status(401).json({
            message: "Otp invalid. Check your email",
          });
        } else {
          await prisma.userVerifyOtp.deleteMany({
            where: {
              userId: userId,
            },
          });
          return res.status(401).json({
            status: "VERIFIED",
            message: "User email verified successfully",
          });
        }
      }
    } catch (err: any) {
      return res.status(500).json({
        status: "FAILED",
        message: err.message,
      });
    }
  },
  resendVerifyOtp: async (req: LogoutRequest, res: Response): Promise<any> => {
    try {
      let { userId, email } = req.body;

      if (!email || !userId) {
        return res.status(422).json({
          message: "Empty email detail is not allowed",
        });
      } else {
        await prisma.userVerifyOtp.deleteMany({
          where: {
            userId: userId,
          },
        });

        await sendEmailOTP({ email, id: userId }, res);
      }
    } catch (err: any) {
      return res.status(500).json({
        status: "FAILED",
        message: err.message,
      });
    }
  },
};
