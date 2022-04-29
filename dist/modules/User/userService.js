"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUser = void 0;
/* eslint-disable import/prefer-default-export */
// import User, { IProfile, IRegistration, IUser } from '../../models/User';
const errors_1 = require("../../utils/errors");
const dal = __importStar(require("./userDal"));
// import * as validator from './userValidator';
// import * as authorization from './userAuthorization';
const readUser = async (userId) => {
    const user = await dal.findProfile({
        query: { _id: userId },
    });
    if (!user) {
        throw new errors_1.NotFound('Author not found');
    }
    return user;
};
exports.readUser = readUser;
// export const updateUser = async (userId: string, requestBody: IProfile, user: IProfile) => {
//   validator.validatePatchUserRequest(requestBody);
//   authorization.authorizeWriteRequest({ user });
//   const profile = await User.findOne
// };
