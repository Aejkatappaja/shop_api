import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string | null): Promise<string> => {
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    if (!passwordHash) {
      return null;
    } else return passwordHash;
  } catch (error: unknown) {
    console.error('Error hashing password:', error);
    throw error;
  }
};
