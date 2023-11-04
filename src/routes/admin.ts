import express from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { getAllUsers } from '../controllers/user/list.controller';

const adminRouter = express.Router();

adminRouter.get('/users', isAdmin, getAllUsers);

export default adminRouter;
