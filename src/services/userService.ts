// services/userService.ts
import { Repository } from "typeorm";
import {
  CreateUser,
  ReadUser,
  ReturnUser,
  UpdateUser,
} from "../interfaces/userInterfaces";
import User from "../entities/userEntities";
import { AppDataSource } from "../data-source";
import { userSchemaReturn, userSchemaRead } from "../schemas/userSchemas";
import { CreateContact } from "interfaces/contactInterface";
import { Contact } from "../entities";

const createUser = async (payload: CreateUser): Promise<ReturnUser> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const createdUser: User = repository.create({ ...payload, contacts: [] });
  console.log(createdUser);

  await repository.save(createdUser);

  const result: ReturnUser = userSchemaReturn.parse(createdUser);

  return result;
};

const readUsers = async (): Promise<ReturnUser[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find({ relations: ["contacts"]});


  const result: ReturnUser[] = userSchemaRead.parse(users)

  return result;
};

const updateUser = async (
  id: number,
  payload: UpdateUser
): Promise<ReturnUser> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);
  console.log(id);

  const foundUser: User | null = await repository.findOne({
    where: {
      id: id,
    },relations:{contacts:true}
  });
  const user: User = repository.create({
    ...foundUser,
    ...payload,
  });
  console.log(user);
  
  await repository.save(user);

  const result: ReturnUser = userSchemaReturn.parse(user);
  return result;
};

const destroyUser = async (id: number): Promise<void> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await repository.findOne({
    where: {
      id: id,
    },
  });
  await repository.softRemove(user!);
};

const addContact = async (
  userId: number,
  payload: CreateContact
): Promise<ReturnUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const user: User | null = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contacts")
    .where("user.id = :userId", { userId })
    .getOne();

  if (!user) {
    return {} as ReturnUser;
  }

  const newContact = new Contact();
  newContact.full_name = payload.full_name;
  newContact.email = payload.email;
  newContact.phone_number = payload.phone_number;

  user.contacts.push(newContact);

  await contactRepository.save(newContact);
  await userRepository.save(user);

  const result: ReturnUser = userSchemaReturn.parse(user);

  return result;
};

const removeContact = async (
  userId: number,
  contactId: number
): Promise<ReturnUser | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contacts")
    .where("user.id = :userId", { userId })
    .getOne();

  if (!user) {
    return null;
  }

  const contactToRemoveIndex = user.contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactToRemoveIndex === -1) {
    return null;
  }

  user.contacts.splice(contactToRemoveIndex, 1);

  await userRepository.save(user);

  const formattedContacts = user.contacts.map((contact) => ({
    id: contact.id,
    full_name: contact.full_name,
    email: contact.email,
    phone_number: contact.phone_number,
    registration_date: contact.registration_date,
    delete_date: contact.delete_date,
  }));

  const result: ReturnUser = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    phone_number: user.phone_number,
    registration_date: user.registration_date,
    delete_date: user.delete_date,
    contacts: formattedContacts,
  };

  return result;
};

export default {
  createUser,
  readUsers,
  updateUser,
  addContact,
  destroyUser,
  removeContact,
};
