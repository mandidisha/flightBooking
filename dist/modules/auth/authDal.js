"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.updateUser = exports.createUser = exports.findUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const findUser = async (query) => {
    const result = await User_1.default.findOne({ query });
    return result;
};
exports.findUser = findUser;
const createUser = async (content) => {
    const result = await User_1.default.create(content);
    return result;
};
exports.createUser = createUser;
const updateUser = async (query, content) => {
    const options = { new: true };
    const result = await User_1.default.findOneAndUpdate(query, content, options);
    return result;
};
exports.updateUser = updateUser;
const deleteUsers = async (query) => {
    await User_1.default.deleteMany({ query });
};
exports.deleteUsers = deleteUsers;
