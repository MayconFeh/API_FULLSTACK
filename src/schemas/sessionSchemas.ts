import { z } from "zod";

const sessionSchemaCreate = z.object({
  email: z.string().email(),
  password: z.string(),
});

const sessionSchemaReturn = z.object({
  token: z.string(),
  userId: z.number()
});

export { sessionSchemaCreate, sessionSchemaReturn };