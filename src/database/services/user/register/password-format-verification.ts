import passwordRegex from '../../../../utils/password-regex';

export const passwordFormatVerification = async (password: string): Promise<boolean> => {
  try {
    const regex = passwordRegex();
    const isPasswordvalid = regex.test(password);

    if (isPasswordvalid) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error :', error);
    throw error;
  }
};
