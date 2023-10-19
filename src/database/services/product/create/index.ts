import { newProductCreation } from './creation-product';
import { wrongQuantity } from './verification-quantity';
import { missingRequiredInformation } from './verification-informations';
import { productAlreadyExists } from './verification-product-existence';

const product_create_services = {
  newProductCreation,
  wrongQuantity,
  missingRequiredInformation,
  productAlreadyExists,
};

export default product_create_services;
