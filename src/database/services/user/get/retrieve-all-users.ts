// import User from '../../../models/user.model';
// import { IUser } from '../../../../types/user.type';

// export const getUsersList = async (): Promise<IUser[] | null> => {
//   try {
//     const users = await User.find().select('-password -__v').sort({ createdAt: -1 });
//     if (users) {
//       return users;
//     } else return null;
//   } catch (error: unknown) {
//     console.error('Error during fetching productId process :', error);
//     throw error;
//   }
// };

import User from '../../../models/user.model';
import { IUser } from '../../../../types/user.type';

export const getUsersList = async (
  page?: number,
  query?: string,
): Promise<{ users: IUser[]; total: number } | null> => {
  try {
    const perPage = 5;
    const skip = (page - 1) * perPage;
    const total = await User.countDocuments();
    let filter;
    if (query) {
      filter = {
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { role: { $regex: query, $options: 'i' } },
        ],
      };
    }

    const users = await User.find(filter)
      .select('-password -__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(page ? perPage : null);

    if (users) {
      return { users, total };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
    throw error;
  }
};
