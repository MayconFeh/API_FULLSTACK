import { z } from "zod";
import {
  sessionSchemaCreate,
  sessionSchemaReturn,
} from "../schemas/sessionSchemas";

type SessionCreate = z.infer<typeof sessionSchemaCreate>;
type SessionReturn = z.infer<typeof sessionSchemaReturn>;

export { SessionCreate, SessionReturn };
