import express from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { getAllUsers } from '../controllers/user/list.controller';

const adminRouter = express.Router();

adminRouter.use(isAdmin);

adminRouter.get('/users', getAllUsers);

export default adminRouter;
