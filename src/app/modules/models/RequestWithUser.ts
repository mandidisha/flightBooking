import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    isAdmin: boolean;
    confirmationToken: boolean;
    twoFactorAuthentication: boolean;
  };
}

export default RequestWithUser;
