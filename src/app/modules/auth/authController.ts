import * as express from 'express';
import * as service from './authService';

export const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log('register  boyd', req.body);
  try {
    await service.registerUser(req.body);
  } catch (e) {
    next(e);
  }
};

export const resendConfirmationEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.resendConfirmationEmail(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const confirmAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.confirmAccount(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const logIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.logIn(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const requestNewPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.requestNewPassword(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.resetPassword(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const initTwoFactorAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const result = await service.initTwoFactorAuthentication(
      req.user._id,
    );
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const completeTwoFactorAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.completeTwoFactorAuthentication(
      // eslint-disable-next-line no-underscore-dangle
      req.body._id,
      req.body,
    );
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

export const verifyTwoFactorAuthToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await service.completeTwoFactorAuthentication(
      // eslint-disable-next-line no-underscore-dangle
      req.body._id,
      req.body,
    );
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
