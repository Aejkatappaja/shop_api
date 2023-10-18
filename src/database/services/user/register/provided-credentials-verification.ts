import { IUser } from 'types/user.type';

export const missingRequiredInformations = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { firstName, lastName, email, password } = userInfos;

    if (!firstName || !lastName || !email || !password) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error during required informations verification process:', error);
    throw error;
  }
};
