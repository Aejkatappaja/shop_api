import express from 'express';
import { getProductById } from '../controllers/product/find.controller';
import { createProduct } from '../controllers/product/create.controller';
import { getProducts } from '../controllers/product/list.controller';
import { isAdmin } from '../middlewares/admin.middleware';
import { deleteProduct } from '../controllers/product/delete.controller';

const productRouter = express.Router();

productRouter.post('/product/create', isAdmin, createProduct);
productRouter.get('/products', getProducts);
productRouter.get('/product/:id', getProductById);
productRouter.delete('/product/delete/:id', isAdmin, deleteProduct);

export default productRouter;
