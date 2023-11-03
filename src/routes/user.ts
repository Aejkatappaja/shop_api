import express from 'express';
import { Request, Response } from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { userRegister } from '../controllers/user/register.controller';
import { userLogin } from '../controllers/user/login.controller';
import { IUser } from 'types/user.type';
import { verifiedUser } from '../middlewares/verified_user.middleware';
import { getUser } from '../controllers/user/find.controller';
import { getAllUsers } from '../controllers/user/list.controller';
import { deleteUser } from '../controllers/user/delete.controller';

const userRouter = express.Router();

userRouter.get('/user/admin-only', isAdmin, (req: Request & { user?: IUser }, res: Response) => {
  // const user = req;
  // console.log('userzzzzz', user.user);

  return res.json({ message: 'Welcome, admin!' });
});

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);
userRouter.get('/user', verifiedUser, getUser);
// userRouter.get('/user/:id', isAdmin, AdminGetUser);
userRouter.get('/users', isAdmin, getAllUsers);
userRouter.delete('/user/delete/:id', verifiedUser, deleteUser);

export default userRouter;
