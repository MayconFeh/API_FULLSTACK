// routes/users.routes.ts
import express from "express";
import { userController } from "../controllers";
import { validateBody, validateToken, checkUserId, checkEmailExists, checkDuplicateContact } from "../middlewares";
import { userSchemaCreate } from "../schemas/userSchemas";
import { contactSchemaCreate } from "../schemas/contactSchemas";

const userRouter = express.Router();

userRouter.post("/", validateBody(userSchemaCreate), checkEmailExists, userController.create);
userRouter.get("/", validateToken, userController.read);
userRouter.patch("/:userId/", validateToken, checkUserId, userController.update);
userRouter.delete(
  "/:userId",
  validateToken,
  checkUserId,
  userController.destroy
);
userRouter.post('/:userId/contact/', validateToken, validateBody(contactSchemaCreate), checkDuplicateContact, userController.addContact);
userRouter.delete('/:userId/contact/:contactId/', validateToken, checkUserId, userController.removeContact);

export default userRouter;
