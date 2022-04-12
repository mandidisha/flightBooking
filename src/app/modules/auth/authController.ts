/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import * as express from 'express';
// import RequestWithUser from '../models/RequestWithUser';
import * as service from './authService';

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.registerUser(req.body);
  } catch (e) {
    next(e);
  }
};

export const resendConfirmationEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.resendConfirmationEmail(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const confirmAccount = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.confirmAccount(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const logIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.logIn(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const requestNewPassword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.requestNewPassword(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await service.resetPassword(req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
