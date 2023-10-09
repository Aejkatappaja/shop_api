import express from 'express';
import { Request, Response } from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { userRegister } from '../controllers/user/register.controller';

const userRouter = express.Router();

userRouter.get('/admin-only', isAdmin, (req: Request, res: Response) => {
  res.json({ message: 'Welcome, admin!' });
});

userRouter.post('/user/register', userRegister);
userRouter.post('user/login');

export default userRouter;
