import { NextFunction, Request, Response } from 'express';
import { Contact } from '../entities/contactEntities';
import { contactSchemaCreate } from '../schemas/contactSchemas';
import { AppDataSource } from '../data-source';

const checkDuplicateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, phone_number } = req.body;

    if (!email && !phone_number) {
      return next();
    }

    const repository = AppDataSource.getRepository(Contact);

    const existingContact = await repository.findOne({
      where: [{ email }, { phone_number }],
    });

    if (existingContact) {
      return res.status(400).json({
        message: 'A contact with this email or phone number already exists.',
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while checking duplicates.',
    });
  }
};

export default checkDuplicateContact;
