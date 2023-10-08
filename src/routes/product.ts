import express from 'express';
import { getProductById } from '../controllers/product/find.controller';
import { createProduct } from '../controllers/product/create.controller';
import { getProducts } from '../controllers/product/list.controller';
import { isAdmin } from '../middlewares/admin.middleware';

const productRouter = express.Router();

productRouter.post('/product/create', isAdmin, createProduct);
productRouter.get('/product/stock', getProducts);
productRouter.get('/product/:id', getProductById); //add (\\d+) regexp to secure route with only number as passed params.

export default productRouter;
