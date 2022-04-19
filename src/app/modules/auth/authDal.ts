import { FilterQuery } from 'mongoose';
import User, { IQuery, IUpdate, IUser } from '../../models/User';

export const findUser = async (query: FilterQuery<IQuery>): Promise<IUser | null> => {
  const result = await User.findOne({ query });
  return result;
};

export const createUser = async (content: IUpdate): Promise<IUser> => {
  const result = await User.create(content);
  return result;
};

export const updateUser = async (
  query: FilterQuery<IQuery>,
  content: IUpdate,
): Promise<IUser | null> => {
  const options = { new: true };
  const result = await User.findOneAndUpdate(
    query,
    content,
    options,
  );
  return result;
};

export const deleteUsers = async (query: FilterQuery<IQuery>): Promise<void> => {
  await User.deleteMany({ query });
};
