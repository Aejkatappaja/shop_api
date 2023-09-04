import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import productService from '../../services/product.service';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct[], Record<string, unknown>>> => {
  try {
    const products = await productService.getAllProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in DB' });
    } else {
      return res.status(200).send({ products });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
