// services/contactsService.ts
import { Repository } from "typeorm";
import { CreateContact, ReadContact, ReturnContact, UpdateContact } from "../interfaces/contactInterface";
import Contact from "../entities/contactEntities";
import { AppDataSource } from "../data-source";
import { contactSchemaRead, contactSchemaReturn } from "../schemas/contactSchemas";

const createContact = async (payload: CreateContact): Promise<ReturnContact> => {
  try {
    const { email, phone_number } = payload;

    if (!email && !phone_number) {
      throw new Error('Either email or phone number is required for adding a contact.');
    }

    const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

    const createdContact: Contact = repository.create({
      full_name: payload.full_name || 'Contato sem Nome',
      email: email,
      phone_number: phone_number,
      registration_date: new Date().toISOString(),
    });

    await repository.save(createdContact);

    const result: ReturnContact = contactSchemaReturn.parse(createdContact);
    return result;
  } catch (error) {
    throw error;
  }
};


const readContacts = async (): Promise<ReadContact> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contacts: Contact[] = await repository.find();

  const result: ReadContact = contactSchemaRead.parse(contacts);

  return result;
};

const updateContact = async (id: number, payload: UpdateContact): Promise<ReturnContact> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const foundContact: Contact | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  const contact: Contact = repository.create({
      ...foundContact,
      ...payload,
    });
  await repository.save(contact);

  const result: ReturnContact = contactSchemaReturn.parse(contact);
  return result;
};

const destroyContact = async (id: number): Promise<void> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  await repository.softRemove(contact!);
};

export default { createContact, readContacts, updateContact, destroyContact };
