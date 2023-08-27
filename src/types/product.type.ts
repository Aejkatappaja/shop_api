export interface IProduct extends Document {
  brand: string;
  name: string;
  price: number;
  picture?: string;
  quantity: number;
  description: string;
  sku: number;
}
