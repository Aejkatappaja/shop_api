import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import productService from '../../services/product.service';

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  const productId = req.params.id;
  try {
    const product: IProduct = await productService.getProductId(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } else {
      return res.status(200).send({ product });
      sssss;
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
