export type RolesType = {
  role: 'Customer' | 'Admin';
};

export type AddressType = {
  country: string;
  city: string;
  street_name: string;
  street_number: string;
  zip_code: string;
  additional_information: string;
};
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  role: RolesType;
  address: AddressType;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface IUserResponse {
  firstName: string;
  lastName: string;
  address: AddressType;
  email: string;
  avatar: string;
  token: string;
}
