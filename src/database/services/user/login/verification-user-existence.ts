import User from '../../../models/user.model';

export const userExists = async (email: string): Promise<boolean> => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error('Error checking userinfos:', error);
    throw error;
  }
};
