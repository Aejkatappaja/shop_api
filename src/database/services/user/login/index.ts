import { userExists } from './user-existence-verification';
import { passwordVerification } from './password-verification';
import { userSuccessfullyRetrieved } from './retrieve-user';
import { missingRequiredInformations } from './provided-credentials-verification';

const user_login_services = {
  userExists,
  missingRequiredInformations,
  userSuccessfullyRetrieved,
  passwordVerification,
};

export default user_login_services;
