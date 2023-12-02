import express from 'express';
import {login} from '../controllers/sessionController';
import { validateBody } from '../middlewares';
import { sessionSchemaCreate } from '../schemas/sessionSchemas';

const loginRouter = express.Router();

loginRouter.post('/', validateBody(sessionSchemaCreate), login);

export default loginRouter;
