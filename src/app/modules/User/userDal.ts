/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { FilterQuery } from 'mongoose';
import User, { IProfile, IQuery } from '../../models/User';

export const findProfile = async (query: FilterQuery<IQuery>): Promise<IProfile | null> => {
  const result = await User.findOne({ query });
  return result;
};

// export const updateUser = async (query: FilterQuery<IQuery>, content: IProfile): Promise<IProfile | null> => {
//   const options = { new: true };
//   const result = await User.findOneAndUpdate(
//     query,
//     content,
//     options,
//   );
//   return result;
// };
// Get all Users

// export const findUsers = async (
//   query: FilterQuery<IQuery>,
//   projection: IUser,
// ): Promise<IUser | null> => {
//   const result = await User.find(query, projection);
//   return result;
// };

// export const findAuthor = async (query: FilterQuery<IQuery>) => {
//   const dbQuery = {};

//   if (query.equal) {
//     Object.keys(query.equal).forEach((key) => {
//       dbQuery[key] = {
//         $eq: query.equal[key],
//       };
//     });
//   }
//   if (query.notEqual) {
//     Object.keys(query.notEqual).forEach((key) => {
//       dbQuery[key] = {
//         $ne: query.notEqual[key],
//       };
//     });
//   }

//   const result = await User.findOne(dbQuery);
//   return result;
// };
