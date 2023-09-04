import express from 'express';
import { getProductById } from '../controllers/product/find.controller';
import { createProduct } from '../controllers/product/create.controller';
import { getProducts } from '../controllers/product/list.controller';

const productRouter = express.Router();

productRouter.post('/product/create', createProduct);
productRouter.get('/product/stock', getProducts);
productRouter.get('/product/:id(\\d+)', getProductById); //add (\\d+) regexp to secure route with only number as passed params.

export default productRouter;
