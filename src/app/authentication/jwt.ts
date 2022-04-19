import Jwt from 'jsonwebtoken';

import { NextFunction, Response, Request } from 'express';
import { boolean } from 'joi';
import config from '../providers/development';
import { IUser } from '../models/User';
import * as dal from '../modules/auth/authDal';
import { NotAuthenticated, NotFound } from '../utils/errors';
import errors from '../providers/errors';

export const createToken = (user: IUser) => Jwt.sign({
  _id: user.id,
  isAdmin: user.isAdmin,
  isSecondFactorAuthenticated: boolean,
  confirmationToken: user.confirmationToken,
}, config.jwtSecretKey);

export const authenticated = (omitSecondFactor = false) => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = request.headers.Authorization as string || '';
    const token = authHeader.replace('Bearer ', '');
    const decodedToken = Jwt.verify(token!, config.jwtSecretKey);
    const { _id, isSecondFactorAuthenticated } = (<any>decodedToken);
    const query = { _id };
    const user = await dal.findUser({ query });

    if (!user) throw new NotFound(errors.AUTH_USER_NOT_FOUND);

    if (!omitSecondFactor && user.twoFactorAuth.active && !isSecondFactorAuthenticated) {
      throw new NotAuthenticated(errors.AUTH_INVALID_2FA_TOKEN);
    }

    // request.user = decodedToken;
    next();
  } catch (e) {
    throw new NotAuthenticated('Not authenticated');
  }
};
