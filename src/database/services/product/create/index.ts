import { newProductCreation } from './creation-product';
import { wrongQuantity } from './verification-quantity';
import { missingRequiredInformation } from './verification-informations';
import { productAlreadyExists } from './verification-product-existence';

const product_create_services = {
  creation: newProductCreation,
  verify_quantity: wrongQuantity,
  verify_informations: missingRequiredInformation,
  verify_existence: productAlreadyExists,
};

export default product_create_services;
