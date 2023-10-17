import bcrypt from 'bcrypt';

export const passwordVerification = async (
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
