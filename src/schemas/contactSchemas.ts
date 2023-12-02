import { z } from "zod";

const contactSchema = z.object({
  id: z.number(),
  full_name: z.string().max(255),
  email: z.string().max(255).email(),
  phone_number: z.string().max(20),
  registration_date: z.string(),
});

const contactSchemaCreate = contactSchema.omit({
  id: true,
  registration_date: true,
});

const contactSchemaReturn = contactSchema;

const contactSchemaRead = contactSchemaReturn.array();

const updateContactSchema = contactSchemaCreate.partial();

export {
  contactSchema,
  contactSchemaCreate,
  contactSchemaReturn,
  updateContactSchema,
  contactSchemaRead,
};
