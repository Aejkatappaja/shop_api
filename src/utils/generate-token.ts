import { tokenGeneration } from '../middlewares/auth.middleware';

export const generateToken = async (id: string): Promise<string | null> => {
  try {
    const token = tokenGeneration(id);
    if (!token) {
      return null;
    } else return token as string;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
