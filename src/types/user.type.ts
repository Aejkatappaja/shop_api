export type Roles = {
  role: 'customer' | 'admin';
};
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  role: Roles;
  email: string;
  avatar: string;
  created: Date;
}
