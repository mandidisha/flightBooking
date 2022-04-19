"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerifyTwoFactorAuthTokenRequest = exports.validateCompleteTwoFactorAuthRequest = exports.validatePasswordUpdateRequest = exports.validateResetPasswordRequest = exports.validateLogInRequest = exports.validateConfirmAccountRequest = exports.validateResendConfirmationEmailRequest = exports.validateUserSignUpRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("../providers/validation");
const validateUserSignUpRequest = (input) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().regex(validation_1.passwordRegex).required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    }).required();
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('error');
    }
};
exports.validateUserSignUpRequest = validateUserSignUpRequest;
const validateResendConfirmationEmailRequest = (input) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    });
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Email error ');
    }
};
exports.validateResendConfirmationEmailRequest = validateResendConfirmationEmailRequest;
const validateConfirmAccountRequest = (input) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Account error');
    }
};
exports.validateConfirmAccountRequest = validateConfirmAccountRequest;
const validateLogInRequest = (input) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('login error');
    }
};
exports.validateLogInRequest = validateLogInRequest;
const validateResetPasswordRequest = (input) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    }).required();
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Reset error');
    }
};
exports.validateResetPasswordRequest = validateResetPasswordRequest;
const validatePasswordUpdateRequest = (input) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().regex(validation_1.passwordRegex).required(),
    }).required();
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Password Update Error');
    }
};
exports.validatePasswordUpdateRequest = validatePasswordUpdateRequest;
const validateCompleteTwoFactorAuthRequest = (input) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Two Factor Error');
    }
};
exports.validateCompleteTwoFactorAuthRequest = validateCompleteTwoFactorAuthRequest;
const validateVerifyTwoFactorAuthTokenRequest = (input) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const result = schema.validate(input);
    if (result.error) {
        throw new Error('Two Factor token error');
    }
};
exports.validateVerifyTwoFactorAuthTokenRequest = validateVerifyTwoFactorAuthTokenRequest;
