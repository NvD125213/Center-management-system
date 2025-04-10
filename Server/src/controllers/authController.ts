import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface AuthType {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: number;
  create_at: Date;
  update_at: Date;
}

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
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Email or password is invalid",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        {
          subject: "accessApi",
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successfully",
        access_token: accessToken,
      });
    }
  },
};
