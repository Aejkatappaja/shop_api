import mongoose, { Model } from 'mongoose';
import { IUser } from 'types/user.type';

export interface IUsertModel extends IUser, Document {}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: false },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now() },
});

const Product: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default Product;
