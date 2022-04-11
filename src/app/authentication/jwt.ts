import { Strategy, ExtractJwt } from 'passport-jwt';
import Jwt from 'jsonwebtoken';

import config from '../modules/providers/development';
import { IUser } from '../modules/models/User';

const opts = {
  secretOrKey: config.jwtSecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const createToken = (user: IUser) => Jwt.sign({
  _id: user.id,
  isAdmin: user.isAdmin,
}, opts.secretOrKey);

export const verify = (token: IUser, done:any) => {
  if (token?.id && token?.isAdmin !== undefined) {
    done(null, token);
  } else {
    done(null, false);
  }
};

export default new Strategy(opts, verify);
