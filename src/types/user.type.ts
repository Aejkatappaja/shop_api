export interface IUser extends Document {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  avatar: string;
  created: Date;
}
