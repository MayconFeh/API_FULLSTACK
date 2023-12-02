import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorApp } from "./errorApp";
import { JsonWebTokenError } from "jsonwebtoken";


const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorApp) {
    return res.status(err.codeStatus).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }
  
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
     message: err.message
    })
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { handleError }