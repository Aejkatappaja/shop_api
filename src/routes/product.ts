import { getProductById } from '../controllers/product/find.controller';
import { createProduct } from '../controllers/product/create.controller';
import express from 'express';

const productRouter = express.Router();

productRouter.post('/product/create', createProduct);
productRouter.get('/product/:id', getProductById);

export default productRouter;
