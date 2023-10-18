import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
  } catch (error: unknown) {
    console.error('Error hashing password:', error);
    throw error;
  }
};
