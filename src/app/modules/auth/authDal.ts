/* eslint-disable import/prefer-default-export */
import User from '../models/User';

export const findUser = async ({ query }:any) => {
  const result = await User.findOne({ query });
  return result;
};

export const createUser = async (content: any) => {
  const result = await User.create(content);
  return result;
};

export const updateUser = async ({ query, content }: any) => {
  const options = { new: true };
  const result = await User.findOneAndUpdate(
    { query },
    { content },
    options,
  );
  return result;
};

export const deleteUsers = async ({ query }: any) => {
  await User.deleteMany({ query });
};
