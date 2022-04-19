/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import Bcrypt from 'bcrypt';
import * as express from 'express';
import * as Crypto from 'crypto';
import confirmationLevels from '../../providers/confirmationLevels';
import * as validator from './authValidator';
import * as dal from './authDal';
import * as twoFactorAuth from '../../authentication/twoFactorAuth';
import errors from '../../providers/errors';
import * as helpers from './authHelper';
import { IRegistration, IUser } from '../../models/User';
import { createToken } from '../../authentication/jwt';
import { NotAuthenticated, NotFound, UnprocessableEntity } from '../../utils/errors';

export const registerUser = async (requestBody: IRegistration) => {
  validator.validateUserSignUpRequest(requestBody);
  const query = {
    email: requestBody.email.toLowerCase(),
  };
  const userWithTheSameEmail = await dal.findUser(
    query,
  );
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
    // token: createToken(requestBody),
    isAdmin: false,
    twoFactorAuth: { active: false },
  };
  const createdUser = await dal.createUser(newUserBody);
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
  const updatedUser = await dal.updateUser(
    query,
    update,
  );

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
  const updatedUser = await dal.updateUser(
    query,
    update,
  );

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
  delete userWithToken.twoFactorAuth.secret;
  // if (user?.twoFactorAuth.active) {
  //   return {twoFactorAuth} : true)
  // } else
  return userWithToken;
};

async function checkIfPasswordsMatch(existingPassword: string, givenPassword: string) {
  const passwordsMatch = await Bcrypt.compare(givenPassword, existingPassword);

  if (!passwordsMatch) {
    throw new NotAuthenticated(errors.INVALID_PASSWORD);
  }
}
function checkIfEmailExists(user: IUser | null) {
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
  const updatedUser = await dal.updateUser(
    query,
    update,
  );

  checkIfUserAccountExists(updatedUser);
  await helpers.sendEmailWithResetPasswordLink({
    user: updatedUser,
    redirectUrl: requestBody.redirectUrl,
  });
};

function checkIfUserAccountExists(user: IUser | null) {
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
  const updatedUser = await dal.updateUser(
    query,
    update,
  );

  checkIfUserAccountExists(updatedUser);
};

export const initTwoFactorAuthentication = async (userId: string) => {
  const query = { _id: userId };
  const user = await dal.findUser({ query });

  checkIfUserAccountExists(user);

  const secret = twoFactorAuth.generateSecret(user!.email);
  const qrCodeBase64 = await twoFactorAuth.generateQRCode(secret);
  const update = { twoFactorAuth: { active: true } };
  await dal.updateUser(
    query,
    update,
  );

  return qrCodeBase64;
};

export const completeTwoFactorAuthentication = async (userId: IUser, requestBody: IRegistration) => {
  validator.validateCompleteTwoFactorAuthRequest(requestBody);

  const { token } = requestBody;
  const query = { _id: userId };
  const user = await dal.findUser({ query });

  checkIfUserAccountExists(user);
  checkIfTwoFactorAuthIsEnabled(user);
  checkIfTokenIsValid(user!, token);

  const update = { twoFactorAuth: { active: true } };
  await dal.updateUser(
    query,
    update,
  );
};

function checkIfTwoFactorAuthIsEnabled(user: any | null) {
  if (!user!.twoFactorAuth.secret) {
    throw new UnprocessableEntity(errors.NO_2FA);
  }
}

function checkIfTokenIsValid(user: any, token: string) {
  const tokenIsNotValid = !twoFactorAuth.validateToken(
    user.twoFactorAuth.secret,
    token,
  );

  if (tokenIsNotValid) {
    throw new UnprocessableEntity(errors.INVALID_2FA_TOKEN);
  }
}

export const verifyTwoFactorAuthToken = async (userId: IUser, requestBody: IRegistration) => {
  validator.validateVerifyTwoFactorAuthTokenRequest(requestBody);

  const { token } = requestBody;
  const user = await dal.findUser({ query: { _id: userId } });

  checkIfUserAccountExists(user);
  checkIfTwoFactorAuthIsActivated(user);
  checkIfTokenIsValid(user!, token);
};

function checkIfTwoFactorAuthIsActivated(user: IUser | null) {
  if (!user!.twoFactorAuth.active) {
    throw new UnprocessableEntity(errors.NO_2FA);
  }
}
