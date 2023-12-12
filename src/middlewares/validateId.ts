// middlewares/checkUserId.ts
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/userEntities';
import { ErrorApp } from '../errors/errorApp';
import { AppDataSource } from '../data-source';

const checkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = parseInt(req.params.userId, 10);

  const userRepository = AppDataSource.getRepository(User);

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
