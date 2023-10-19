import express from 'express';
import { Request, Response } from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { userRegister } from '../controllers/user/register.controller';
import { userLogin } from '../controllers/user/login.controller';
import { IUser } from 'types/user.type';
import { verifiedUser } from '../middlewares/verified_user.middleware';
import { getUser } from '../controllers/user/find.controller';
import { getAllUsers } from '../controllers/user/list.controller';

const userRouter = express.Router();

userRouter.get('/user/admin-only', isAdmin, (req: Request & { user?: IUser }, res: Response) => {
  // const user = req;
  // console.log('userzzzzz', user.user);

  return res.json({ message: 'Welcome, admin!' });
});

userRouter.get('/user/:id', verifiedUser, getUser);
userRouter.get('/users', isAdmin, getAllUsers);
userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);

export default userRouter;
