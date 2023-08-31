import { Request, Response } from 'express';
import { IProduct } from 'types/product.type';
import {
  CreateNewProduct,
  MissingProductInfos,
  ExistingProduct,
  WrongProductQuantity,
} from '../../services/product.service';

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  try {
    const productInfos: IProduct = req.body;

    const missingProductInfos = await MissingProductInfos(productInfos);

    const existingProduct = await ExistingProduct(productInfos);

    const wrongProductQuantity = await WrongProductQuantity(productInfos);

    if (missingProductInfos) {
      return res.status(400).json({ message: 'You need to provide all the required informations' });
    } else if (existingProduct) {
      return res.status(409).json({ message: 'Product with the same name already exists!' });
    } else if (wrongProductQuantity) {
      return res.status(400).json({
        message: 'Invalid product quantity. Quantity must be greater than or equal to 1.',
      });
    } else {
      const newProduct = await CreateNewProduct(productInfos);
      return res.status(201).json(newProduct);
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
