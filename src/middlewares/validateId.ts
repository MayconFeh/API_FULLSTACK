// middlewares/checkUserId.ts
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/userEntities';
import { ErrorApp } from '../errors/errorApp';

const checkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = parseInt(req.params.userId, 10);

  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new ErrorApp('User not found', 404);
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};

export default checkUserId;
