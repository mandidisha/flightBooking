/* eslint-disable import/prefer-default-export */
// import User, { IProfile, IRegistration, IUser } from '../../models/User';
import { NotFound } from '../../utils/errors';
import * as dal from './userDal';
// import * as validator from './userValidator';
// import * as authorization from './userAuthorization';

export const readUser = async (userId: string) => {
  const user = await dal.findProfile({
    query: { _id: userId },
  });

  if (!user) {
    throw new NotFound('Author not found');
  }

  return user;
};

// export const updateUser = async (userId: string, requestBody: IProfile, user: IProfile) => {
//   validator.validatePatchUserRequest(requestBody);
//   authorization.authorizeWriteRequest({ user });
//   const profile = await User.findOne
// };
