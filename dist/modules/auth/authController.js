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
exports.verifyTwoFactorAuthToken = exports.completeTwoFactorAuthentication = exports.initTwoFactorAuthentication = exports.resetPassword = exports.requestNewPassword = exports.logIn = exports.confirmAccount = exports.resendConfirmationEmail = exports.registerUser = void 0;
const service = __importStar(require("./authService"));
const registerUser = async (req, res, next) => {
    try {
        await service.registerUser(req.body);
    }
    catch (e) {
        next(e);
    }
};
exports.registerUser = registerUser;
const resendConfirmationEmail = async (req, res, next) => {
    try {
        await service.resendConfirmationEmail(req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.resendConfirmationEmail = resendConfirmationEmail;
const confirmAccount = async (req, res, next) => {
    try {
        await service.confirmAccount(req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.confirmAccount = confirmAccount;
const logIn = async (req, res, next) => {
    try {
        await service.logIn(req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.logIn = logIn;
const requestNewPassword = async (req, res, next) => {
    try {
        await service.requestNewPassword(req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.requestNewPassword = requestNewPassword;
const resetPassword = async (req, res, next) => {
    try {
        await service.resetPassword(req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.resetPassword = resetPassword;
const initTwoFactorAuthentication = async (req, res, next) => {
    try {
        const result = await service.initTwoFactorAuthentication(req.user._id);
        res.status(200).send(result);
    }
    catch (e) {
        next(e);
    }
};
exports.initTwoFactorAuthentication = initTwoFactorAuthentication;
const completeTwoFactorAuthentication = async (req, res, next) => {
    try {
        await service.completeTwoFactorAuthentication(
        // eslint-disable-next-line no-underscore-dangle
        req.body._id, req.body);
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
};
exports.completeTwoFactorAuthentication = completeTwoFactorAuthentication;
const verifyTwoFactorAuthToken = async (req, res, next) => {
    try {
        await service.completeTwoFactorAuthentication(
        // eslint-disable-next-line no-underscore-dangle
        req.body._id, req.body);
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
};
exports.verifyTwoFactorAuthToken = verifyTwoFactorAuthToken;
