// controllers/login.controller.ts
import { Request, Response } from 'express';
import { sessionService } from '../services';
import { SessionCreate, SessionReturn, } from '../interfaces/sessionInterface';

const login = async (req: Request, res: Response): Promise<Response> => {
  const payload: SessionCreate = req.body;
  const result: SessionReturn = await sessionService.login(payload);
  return res.status(200).json(result);
};

export { login };
