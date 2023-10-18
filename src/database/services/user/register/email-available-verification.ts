import User from '../../../../database/models/user.model';

export const emailAvailable = async (email: string): Promise<boolean> => {
  try {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error('Error checking email taken:', error);
    throw error;
  }
};
