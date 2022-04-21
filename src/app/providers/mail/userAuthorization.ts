import { NotAuthorized } from '../../utils/errors';

// eslint-disable-next-line import/prefer-default-export
export const authorizeWriteRequest = (user: any) => {
  if (!user.isAdmin) {
    throw new NotAuthorized('User is not admin ', '');
  }
};
