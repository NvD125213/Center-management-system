import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../Types/userType";

const prisma = new PrismaClient();

export const ensureAuthenticated = (
  req: Request<{}, {}, UserType>,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access token not found" });
    return;
  }

  const accessToken = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_PRIVATE_KEY;

  if (!secret) {
    res.status(500).json({ message: "Token secret not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Access token expired",
        code: "AccessTokenExpired",
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Access token invalid",
        code: "AccessTokenInvalid",
      });
    } else {
      res.status(500).json({
        message: err.message,
      });
    }
  }
};

export function authorize(roles: number[]): RequestHandler {
  return async (req, res, next): Promise<void> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: (req as any).user.id },
      });

      if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
