/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { IProfile } from '../../models/User';
import { BadRequest } from '../../utils/errors';

export const validatePatchUserRequest = (input: IProfile) => {
  const schema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    genres: Joi.array().items(Joi.string()).min(1),
  }).required();

  const result = schema.validate(input);

  if (result.error) {
    throw new BadRequest(result?.error?.details, '');
  }
};
