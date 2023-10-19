import { getUsersList } from './retrieve-all-users';
import { getUserById } from './retrieve-user';

const user_get_services = {
  getUserById,
  getUsersList,
};

export default user_get_services;
