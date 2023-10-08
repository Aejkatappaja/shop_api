import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from 'types/user.type';

export interface IUsertModel extends IUser, Document {}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Admin'], required: true, default: 'Customer' },
  address: { type: Schema.Types.Mixed, required: false },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
