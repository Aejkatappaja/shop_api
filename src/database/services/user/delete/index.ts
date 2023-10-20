import User from '../../../../database/models/user.model';

export const deleteUser = async (id: string): Promise<boolean | null> => {
  try {
    if (!id) {
      return false;
    } else {
      const userDeleted = await User.findByIdAndDelete(id);
      if (!userDeleted) {
        return null;
      } else return true;
    }
  } catch (error: unknown) {
    console.error('Error during delete User process :', error);
    throw error;
  }
};

const user_delete_services = {
  deleteUser,
};

export default user_delete_services;
