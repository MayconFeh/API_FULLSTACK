import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/userEntities';
import { AppDataSource } from '../data-source';

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ error: 'E-mail already in use' });
  }

  next();
};

export default checkEmailExists;
