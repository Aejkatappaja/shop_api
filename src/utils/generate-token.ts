import { tokenGeneration } from '../middlewares/auth.middleware';

export const generateToken = async (id: string): Promise<string> => {
  try {
    const token = tokenGeneration(id);
    return token as string;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
