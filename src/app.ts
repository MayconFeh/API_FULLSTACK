import express from 'express';
import 'express-async-errors';
import { handleError } from './errors/handleErrors';
import contactRouter from './router/contactRoutes';
import userRouter from './router/userRoutes';
import loginRouter from './router/sessionRoutes';

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/contacts', contactRouter);
app.use('/login', loginRouter);

app.use(handleError);

export default app;
