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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserList = exports.updateUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const service = __importStar(require("./userService"));
const authorization = __importStar(require("../../providers/mail/userAuthorization"));
const getUser = async (req, res, next) => {
    try {
        const result = await service.readUser(req.body._id);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const user = await User_1.default.findById(req.body._id);
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.gender = req.body.gender;
        const updateduser = await user.save();
        res.send(updateduser);
    }
    else {
        res.sendStatus(404);
    }
};
exports.updateUser = updateUser;
const getUserList = async (req, res, next) => {
    const users = await User_1.default.find({});
    authorization.authorizeWriteRequest({ user: req.user });
    try {
        res.send(users);
    }
    catch (e) {
        next(e);
    }
};
exports.getUserList = getUserList;
