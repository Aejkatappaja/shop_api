import express from 'express';
import { getProductById } from '../controllers/product/find.controller';
import { getProducts } from '../controllers/product/list.controller';

const productRouter = express.Router();

productRouter.get('/products', getProducts).get('/product/:id', getProductById);

export default productRouter;
