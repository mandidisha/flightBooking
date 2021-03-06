/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import User from '../../models/User';
import * as service from './userService';
import * as authorization from '../../providers/mail/userAuthorization';
// type CustomRequest = {
//   user: {
//     _id: string;
//     isAdimin: boolean;
//     isConfermed: boolean;
//     token: string;
//   }
// }
export const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await service.readUser(req.body._id);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line consistent-return
) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    const updateduser = await user.save();
    res.send(updateduser);
  } else {
    res.sendStatus(404);
  }
};

export const getUserList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const users = await User.find({});
  authorization.authorizeWriteRequest(req.user);
  try {
    res.send(users);
  } catch (e) {
    next(e);
  }
};
