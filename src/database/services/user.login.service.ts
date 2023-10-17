import User from '../models/user.model';
import { IUser, IUserLogin } from '../../types/user.type';
import bcrypt from 'bcrypt';
import { tokenGeneration } from '../../middlewares/auth.middleware';

export const UserSuccessfullyRetrieved = async (emailProvided: IUserLogin): Promise<IUser | null> => {
  try {
    const { email } = emailProvided;

    const loggedUser = await User.findOne({ email });

    if (!loggedUser) {
      return null;
    }
    return loggedUser;
  } catch (error: unknown) {
    console.error('Error login user:', error);
    throw error;
  }
};

export const MissingProvidedInformations = async (LoginInformationsProvided: IUserLogin): Promise<boolean> => {
  try {
    const { email, password } = LoginInformationsProvided;

    if (!email || !password) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};

export const UserExists = async (email: string): Promise<boolean> => {
  try {
    const ExistingUser = await User.findOne({ email });
    if (!ExistingUser) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};

export const PasswordVerification = async (
  passwordProvidedByUser: string,
  realUserPassword: string,
): Promise<boolean> => {
  try {
    const verifiedPassword = bcrypt.compareSync(passwordProvidedByUser, realUserPassword);
    if (!verifiedPassword) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error during credentials verification infos:', error);
    throw error;
  }
};

export const GenerateToken = async (id: string): Promise<string> => {
  try {
    const token = tokenGeneration(id);
    return token as string;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// export const userResponse = async (userLogged: IUser, token: string): Promise<IUserResponse | null> => {
//   try {
//     const { firstName, lastName, email, address, avatar, role } = userLogged;
//     const userResponse: IUserResponse = {
//       firstName,
//       lastName,
//       address,
//       email,
//       avatar,
//       role,
//       token,
//     };
//     return userResponse;
//   } catch (error) {
//     console.error('Error during credentials verification infos:', error);
//     throw error;
//   }
// };

const userLoginService = {
  UserSuccessfullyRetrieved,
  MissingProvidedInformations,
  UserExists,
  PasswordVerification,
  GenerateToken,
  // userResponse,
};

export default userLoginService;
