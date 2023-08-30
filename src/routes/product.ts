import { createProduct } from '../controllers/product/create.controller';
import express from 'express';

const productRouter = express.Router();

productRouter.post('/product/create', createProduct);

export default productRouter;
