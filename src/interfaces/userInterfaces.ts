import { z } from "zod";
import {
  userSchema,
  userSchemaCreate,
  userSchemaReturn,
  updateUserSchema,
  userSchemaRead,
} from "../schemas/userSchemas";
import { DeepPartial } from "typeorm";

type Users = z.infer<typeof userSchema>;
type CreateUser = z.infer<typeof userSchemaCreate>;
type ReturnUser = z.infer<typeof userSchemaReturn>;
type UpdateUser = DeepPartial<typeof updateUserSchema>;
type ReadUser = z.infer<typeof userSchemaRead>;

export { Users, CreateUser, ReturnUser, UpdateUser, ReadUser };
