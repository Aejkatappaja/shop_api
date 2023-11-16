import { Document } from 'mongoose';

export interface IUserLogin {
  email: string;
  password: string;
}

export type AddressType = {
  country: string;
  city: string;
  street_name: string;
  street_number: string;
  zip_code: string;
  additional_information: string;
};

export type RolesType = 'Customer' | 'Admin';

export interface IUser extends Document, IUserLogin {
  _id?: string;
  firstName: string;
  lastName: string;
  role: RolesType;
  address: AddressType;
  avatar: string;
  createdAt: Date;
}
