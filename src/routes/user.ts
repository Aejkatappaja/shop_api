import express from 'express';
import { Request, Response } from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { userRegister } from '../controllers/user/register.controller';
import { userLogin } from '../controllers/user/login.controller';
import { IUser } from 'types/user.type';

const userRouter = express.Router();

userRouter.get('/user/admin-only', isAdmin, (req: Request & { user?: IUser }, res: Response) => {
  // const user = req;
  // console.log('userzzzzz', user.user);

  return res.json({ message: 'Welcome, admin!' });
});

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);

export default userRouter;
