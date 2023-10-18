import User from '../../../models/user.model';

export const userExists = async (email: string): Promise<boolean> => {
  try {
    const ExistingUser = await User.findOne({ email });
    if (!ExistingUser) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};
