import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ErrorApp } from "../errors/errorApp";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;
  if (!token) {
    throw new ErrorApp("Missing bearer token", 401);
  }
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY!);
  res.locals = { ...res.locals, decoded };
  res.locals = { ...res.locals, userId: decoded.sub };

  return next();
};

export default validateToken;
