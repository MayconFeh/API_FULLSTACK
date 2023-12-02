import express from 'express';
import { contactController } from '../controllers';
import {
  validateBody,
  validateToken,
  checkDuplicateContact,
  validateContactUser,
  checkUserId,
} from '../middlewares';
import { contactSchemaCreate } from '../schemas/contactSchemas';

const contactRouter = express.Router();

contactRouter.post(
  '/',
  validateBody(contactSchemaCreate),
  validateToken,
  checkDuplicateContact,
  validateContactUser,
  contactController.create
);
contactRouter.get('/', validateToken, contactController.read);
contactRouter.put('/:contactId', validateToken, checkUserId, contactController.update);
contactRouter.delete('/:contactId', validateToken, checkUserId, contactController.destroy);

export default contactRouter;