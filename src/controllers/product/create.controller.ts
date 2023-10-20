import { Request, Response } from 'express';
import { IProduct } from 'types/product.type';
import { product_create_services } from '../../database/services/product';

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  try {
    const productInfos: IProduct = req.body;

    // const user = req;

    // console.log(user, 'user');

    const { name, quantity } = productInfos;

    const missingRequiredInformation = await product_create_services.missingRequiredInformation(productInfos);

    if (missingRequiredInformation) {
      return res.status(400).json({ message: 'You need to provide all the required informations' });
    }

    const productAlreadyExists = await product_create_services.productAlreadyExists(name);

    if (productAlreadyExists) {
      return res.status(409).json({ message: 'Product with the same name already exists!' });
    }

    const wrongQuantity = await product_create_services.wrongQuantity(quantity);

    if (wrongQuantity) {
      return res.status(400).json({
        message: 'Invalid product quantity. Quantity must be greater than or equal to 1.',
      });
    } else {
      const newProductCreated = await product_create_services.newProductCreation(productInfos);
      if (newProductCreated) {
        return res.status(201).json(newProductCreated);
      } else {
        return res.status(400).json({
          message: 'Error during product creation process.',
        });
      }
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
