// controllers/user.controller.ts
import { Request, Response } from 'express';
import { userService } from '../services';
import { CreateUser, ReadUser, ReturnUser, UpdateUser } from '../interfaces/userInterfaces';
import { CreateContact, ReturnContact } from 'interfaces/contactInterface';
import { userController } from 'controllers';

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: CreateUser = req.body;
  const user: ReturnUser = await userService.createUser(payload);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: ReadUser = await userService.readUsers();
  return res.status(200).json(users);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(res.locals.userId);
  const payload: UpdateUser = req.body;
  const updatedUser: ReturnUser = await userService.updateUser(id, payload);
  return res.status(200).json(updatedUser);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(res.locals.userId);
  await userService.destroyUser(id);
  return res.status(204).send();
};

const addContact = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = res.locals.userId;
  const payload: CreateContact = req.body;

  const newContact: ReturnContact = await userService.addContact(userId, payload);

  return res.status(201).json(newContact);
};

const removeContact = async (req: Request, res: Response): Promise<void> => {
  const userId: number = res.locals.userId;
  const contactId: number = parseInt(req.params.contactId, 10);
  const result = await userService.removeContact(userId, contactId);
  if (result === null) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    res.status(200).json(result);
  }
};

export { create, read, update, destroy, addContact, removeContact  };
