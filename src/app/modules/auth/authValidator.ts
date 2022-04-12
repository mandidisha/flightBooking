import Joi from 'joi';
import { IRegistration, IUser } from '../models/User';
import { passwordRegex } from '../providers/validation';

export const validateUserSignUpRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    redirectUrl: Joi.string().uri().required(),
  }).required();

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('error');
  }
};

export const validateResendConfirmationEmailRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    redirectUrl: Joi.string().uri().required(),
  });
  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Email error ');
  }
};

export const validateConfirmAccountRequest = (input:IRegistration) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Account error');
  }
};

export const validateLogInRequest = (input: IUser) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('login error');
  }
};

export const validateResetPasswordRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    redirectUrl: Joi.string().uri().required(),
  }).required();

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Reset error');
  }
};

export const validatePasswordUpdateRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().regex(passwordRegex).required(),
  }).required();

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Password Update Error');
  }
};

export const validateCompleteTwoFactorAuthRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Two Factor Error');
  }
};

export const validateVerifyTwoFactorAuthTokenRequest = (input: IRegistration) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const result = schema.validate(input);

  if (result.error) {
    throw new Error('Two Factor token error');
  }
};
