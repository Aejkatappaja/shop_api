import { IUserLogin } from 'types/user.type';

export const missingProvidedInformations = async (LoginInformationsProvided: IUserLogin): Promise<boolean> => {
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
