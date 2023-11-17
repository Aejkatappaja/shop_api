import express from 'express';
import { isAdmin } from '../middlewares/admin.middleware';
import { getAllUsers } from '../controllers/user/list.controller';
import { adminGetUser } from '../controllers/user/admin.find.controller';
import { getDashboardAccess } from '../controllers/admin.dashboard-access.controller';
import { updateProduct } from '../controllers/product/update.controller';
import fileUpload from 'express-fileupload';
import { createProduct } from '../controllers/product/create.controller';
import { deleteProduct } from '../controllers/product/delete.controller';

const adminRouter = express.Router();

adminRouter.use(isAdmin);

adminRouter.get('/admin/dashboard-access', getDashboardAccess);
adminRouter.get('/admin/get-users', getAllUsers);
adminRouter.get('/admin/get-user/:id', adminGetUser);
adminRouter.patch('/admin/update-product/:id', fileUpload(), updateProduct);
adminRouter.post('/admin/product/create', createProduct);
adminRouter.delete('/admin/product/delete/:id', deleteProduct);

export default adminRouter;
