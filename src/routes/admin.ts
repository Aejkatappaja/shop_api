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

adminRouter
  .get('/admin/dashboard-access', getDashboardAccess)
  .get('/admin/get-users', getAllUsers)
  .get('/admin/get-user/:id', adminGetUser)
  .patch('/admin/update-product/:id', fileUpload(), updateProduct)
  .post('/admin/product/create', createProduct)
  .delete('/admin/product/delete/:id', deleteProduct);

export default adminRouter;
