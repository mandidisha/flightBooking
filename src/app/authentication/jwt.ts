import Jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { boolean } from 'joi';
import config from '../providers/development';
import { IUser } from '../models/User';
import * as dal from '../modules/auth/authDal';
import { NotAuthenticated, NotFound } from '../utils/errors';
import errors from '../providers/errors';
import DecodedToken from '../models/DecodedToken';

export const createToken = (user: IUser) => Jwt.sign({
  _id: user.id,
  isAdmin: user.isAdmin,
  isSecondFactorAuthenticated: boolean,
  confirmationToken: user.confirmationToken,
}, config.jwtSecretKey);

export const authenticated = () => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = request.headers.authorization as string || '';
    // console.log('AUTH', request.headers);
    const token = authHeader.replace('Bearer ', '');
    // console.log("token", token);
    const decodedToken = Jwt.verify(token, config.jwtSecretKey) as DecodedToken;
    console.log('decoded', decodedToken);
    const { _id } = (<any>decodedToken);
    const query = { _id };
    const user = await dal.findUser({ query });
    console.log('QYRWY', user, query);
    if (!user) throw new NotFound(errors.AUTH_USER_NOT_FOUND);

    // if (!omitSecondFactor && user.twoFactorAuth.active && !isSecondFactorAuthenticated) {
    //   throw new NotAuthenticated(errors.AUTH_INVALID_2FA_TOKEN);
    // }

    request.user = decodedToken;
    next();
  } catch (e) {
    console.log('ERORRR', e);
    throw new NotAuthenticated('Not authenticated');
  }
};
