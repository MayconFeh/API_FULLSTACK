import { z } from "zod";
import {
  contactSchema,
  updateContactSchema,
  contactSchemaCreate,
  contactSchemaReturn,
  contactSchemaRead,
} from "../schemas/contactSchemas";
import { DeepPartial } from "typeorm";

type Contacts = z.infer<typeof contactSchema>;
type CreateContact = z.infer<typeof contactSchemaCreate>;
type ReturnContact = z.infer<typeof contactSchemaReturn>;
type UpdateContact = DeepPartial<typeof updateContactSchema>;
type ReadContact = z.infer<typeof contactSchemaRead>;

export { Contacts, CreateContact, ReturnContact, UpdateContact, ReadContact };
