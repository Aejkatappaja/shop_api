import express from 'express';
import { userRegister } from '../controllers/user/register.controller';
import { userLogin } from '../controllers/user/login.controller';
import { verifiedUser } from '../middlewares/verified_user.middleware';
import { getUser } from '../controllers/user/find.controller';
import { deleteUser } from '../controllers/user/delete.controller';

const userRouter = express.Router();

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);
userRouter.get('/user', verifiedUser, getUser);
userRouter.delete('/user/delete', verifiedUser, deleteUser);

export default userRouter;
