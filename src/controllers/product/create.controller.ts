import { Request, Response } from 'express';
import { IProduct } from 'types/product.type';
import Product from '../../models/product.model';

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  try {
    const productInfos: IProduct = req.body;

    if (
      !productInfos.brand ||
      !productInfos.name ||
      !productInfos.price ||
      !productInfos.quantity ||
      !productInfos.description
    ) {
      return res.status(400).json({ message: 'You need to provide all the required informations' });
    }

    if (productInfos.quantity < 1) {
      return res.status(400).json({
        message: 'Invalid product quantity. Quantity must be greater than or equal to 1.',
      });
    }

    const newProduct = new Product(productInfos);

    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
