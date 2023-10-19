import { userExists } from './verification-user-existence';
import { passwordVerification } from './verification-password';
import { userSuccessfullyRetrieved } from './retrieve-user';
import { missingRequiredInformations } from './verification-credentials';

const user_login_services = {
  userExists,
  missingRequiredInformations,
  userSuccessfullyRetrieved,
  passwordVerification,
};

export default user_login_services;
