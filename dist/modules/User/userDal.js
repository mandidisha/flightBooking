"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProfile = void 0;
const User_1 = __importDefault(require("../../models/User"));
const findProfile = async (query) => {
    const result = await User_1.default.findOne({ query });
    return result;
};
exports.findProfile = findProfile;
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
