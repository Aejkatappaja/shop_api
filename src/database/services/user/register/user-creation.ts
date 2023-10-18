import User from '../../../../database/models/user.model';
import { IUser } from '../../../../types/user.type';

export const newUserCreation = async (userInfos: IUser): Promise<IUser | null> => {
  try {
    const newUser = new User(userInfos);
    await newUser.save();
    return newUser;
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    throw error;
  }
};
