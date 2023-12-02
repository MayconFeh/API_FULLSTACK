import { z } from "zod";
import { contactSchemaRead, contactSchemaReturn } from "./contactSchemas";

const userSchema = z.object({
  id: z.number(),
  full_name: z.string().max(255),
  email: z.string().max(255).email(),
  password: z.string().max(255),
  phone_number: z.string().max(20),
  registration_date: z.string(),
  contacts: contactSchemaRead.array(),
});

const userSchemaCreate = userSchema.omit({
  id: true,
  registration_date: true,
});

const userSchemaReturn = userSchema.omit({ password: true }).extend({
  contacts: z.array(contactSchemaReturn),
  registration_date: z.string(),
});


const userSchemaRead = userSchemaReturn.array();

const updateUserSchema = userSchemaCreate.partial();

export {
  userSchema,
  userSchemaCreate,
  userSchemaReturn,
  updateUserSchema,
  userSchemaRead,
};
