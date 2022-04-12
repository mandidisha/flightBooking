/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import Bcrypt from 'bcrypt';
import * as express from 'express';
import * as Crypto from 'crypto';
import confirmationLevels from '../providers/confirmationLevels';
import * as validator from './authValidator';
import * as dal from './authDal';
import errors from '../providers/errors';
import * as helpers from './authHelper';
import { IRegistration, IUser } from '../models/User';
import { createToken } from '../../authentication/jwt';
import { NotAuthenticated, NotFound } from '../utils/errors';

export const registerUser = async (requestBody: IRegistration) => {
  validator.validateUserSignUpRequest(requestBody);
  const userWithTheSameEmail = await dal.findUser({
    query: {
      email: requestBody.email.toLowerCase(),
    },
  });
  if (userWithTheSameEmail) {
    throw new Error(errors.DUPLICATE_EMAILS);
  }

  const salt = await Bcrypt.genSalt();
  const hashedPassword = await Bcrypt.hash(requestBody.password, salt);
  const newUserBody = {
    email: requestBody.email.toLowerCase(),
    password: hashedPassword,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
    confirmationLevel: confirmationLevels.PENDING,
    isAdmin: false,
    twoFactorAuth: { active: false },
  };
  const createdUser = await dal.createUser({ content: newUserBody });
  helpers.sendConfirmationEmail({
    user: createdUser,
    redirectUrl: requestBody.redirectUrl,
  });
  console.log(createdUser);
  return createdUser;
};

export const resendConfirmationEmail = async (requestBody: IRegistration) => {
  validator.validateResendConfirmationEmailRequest(requestBody);

  const query = {
    confirmationLevel: confirmationLevels.PENDING,
    email: requestBody.email.toLowerCase(),
  };
  const update = {
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
  };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  if (!updatedUser) {
    throw new Error(errors.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
  }

  await helpers.sendConfirmationEmail({
    user: updatedUser,
    redirectUrl: requestBody.redirectUrl,
  });

  return updatedUser;
};

export const confirmAccount = async (requestBody: IRegistration) => {
  validator.validateConfirmAccountRequest(requestBody);

  const query = {
    confirmationLevel: confirmationLevels.PENDING,
    confirmationToken: requestBody.token,
  };
  const update = {
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
    confirmationLevel: confirmationLevels.CONFIRMED,
  };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  if (!updatedUser) {
    throw new Error(errors.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
  }

  return updatedUser;
};

export const logIn = async (requestBody: IUser) => {
  validator.validateLogInRequest(requestBody);

  const user = await dal.findUser({ query: { email: requestBody.email.toLowerCase() } });

  checkIfEmailExists(user);
  await checkIfPasswordsMatch(user!.password, requestBody.password);
  checkIfUserAccountIsNotConfirmed(requestBody.confirmationLevel);

  const sessionToken = createToken(requestBody);
  const userWithToken = {
    ...user!.toJSON(),
    token: sessionToken,
  };

  // delete userWithToken.password;
  // delete userWithToken.twoFactorAuth;

  return userWithToken;
};

async function checkIfPasswordsMatch(existingPassword: any, givenPassword: any) {
  const passwordsMatch = await Bcrypt.compare(givenPassword, existingPassword);

  if (!passwordsMatch) {
    throw new NotAuthenticated(errors.INVALID_PASSWORD);
  }
}
function checkIfEmailExists(user: any) {
  if (!user) {
    throw new NotAuthenticated(errors.USER_NOT_FOUND);
  }
}

function checkIfUserAccountIsNotConfirmed(currentConfirmationLevel: number) {
  const accountNotConfirmed = currentConfirmationLevel === confirmationLevels.PENDING;

  if (accountNotConfirmed) {
    throw new NotAuthenticated(errors.ACCOUNT_NOT_CONFIRMED);
  }
}

export const requestNewPassword = async (requestBody: IRegistration) => {
  validator.validateResetPasswordRequest(requestBody);

  const confirmationToken = Crypto.randomBytes(32).toString('hex');
  const query = { email: requestBody.email.toLowerCase() };
  const update = { confirmationToken };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  checkIfUserAccountExists(updatedUser);
  await helpers.sendEmailWithResetPasswordLink({
    user: updatedUser,
    redirectUrl: requestBody.redirectUrl,
  });
};

function checkIfUserAccountExists(user:any) {
  if (!user) {
    throw new NotFound(errors.USER_NOT_FOUND);
  }
}

export const resetPassword = async (requestBody: IRegistration) => {
  validator.validatePasswordUpdateRequest(requestBody);

  const salt = await Bcrypt.genSalt();
  const hashedPassword = await Bcrypt.hash(requestBody.password, salt);
  const query = { confirmationToken: requestBody.token };
  const update = { password: hashedPassword };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  checkIfUserAccountExists(updatedUser);
};
