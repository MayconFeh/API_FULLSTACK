// controllers/contact.controller.ts
import { Request, Response } from 'express';
import { contactService } from '../services';
import { CreateContact, ReadContact, ReturnContact, UpdateContact } from '../interfaces/contactInterface';

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: CreateContact = req.body;
  const contact: ReturnContact = await contactService.createContact(payload);
  return res.status(201).json(contact);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const contacts: ReadContact = await contactService.readContacts();
  return res.status(200).json(contacts);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.contactId);
  const payload: UpdateContact = req.body;
  const updatedContact: ReturnContact = await contactService.updateContact(id, payload);
  return res.status(200).json(updatedContact);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.contactId);
  await contactService.destroyContact(id);
  return res.status(204).send();
};

export { create, read, update, destroy };
