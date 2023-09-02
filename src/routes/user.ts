import express from 'express';
import { Request, Response } from 'express';
import { isAdmin } from '../middlewares/admin.middleware';

const userRouter = express.Router();

userRouter.get('/admin-only', isAdmin, (req: Request, res: Response) => {
  res.json({ message: 'Welcome, admin!' });
});

export default userRouter;
