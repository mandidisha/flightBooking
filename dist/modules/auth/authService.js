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
exports.verifyTwoFactorAuthToken = exports.completeTwoFactorAuthentication = exports.initTwoFactorAuthentication = exports.resetPassword = exports.requestNewPassword = exports.logIn = exports.confirmAccount = exports.resendConfirmationEmail = exports.registerUser = void 0;
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const bcrypt_1 = __importDefault(require("bcrypt"));
const Crypto = __importStar(require("crypto"));
const confirmationLevels_1 = __importDefault(require("../../providers/confirmationLevels"));
const validator = __importStar(require("./authValidator"));
const dal = __importStar(require("./authDal"));
const twoFactorAuth = __importStar(require("../../authentication/twoFactorAuth"));
const errors_1 = __importDefault(require("../../providers/errors"));
const helpers = __importStar(require("./authHelper"));
const jwt_1 = require("../../authentication/jwt");
const errors_2 = require("../../utils/errors");
const registerUser = async (requestBody) => {
    validator.validateUserSignUpRequest(requestBody);
    const query = {
        email: requestBody.email.toLowerCase(),
    };
    const userWithTheSameEmail = await dal.findUser(query);
    if (userWithTheSameEmail) {
        throw new Error(errors_1.default.DUPLICATE_EMAILS);
    }
    const salt = await bcrypt_1.default.genSalt();
    const hashedPassword = await bcrypt_1.default.hash(requestBody.password, salt);
    const newUserBody = {
        email: requestBody.email.toLowerCase(),
        password: hashedPassword,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        confirmationToken: Crypto.randomBytes(32).toString('hex'),
        confirmationLevel: confirmationLevels_1.default.PENDING,
        // token: createToken(requestBody),
        isAdmin: false,
        twoFactorAuth: { active: false },
    };
    const createdUser = await dal.createUser(newUserBody);
    helpers.sendConfirmationEmail({
        user: createdUser,
        redirectUrl: requestBody.redirectUrl,
    });
    console.log(createdUser);
    return createdUser;
};
exports.registerUser = registerUser;
const resendConfirmationEmail = async (requestBody) => {
    validator.validateResendConfirmationEmailRequest(requestBody);
    const query = {
        confirmationLevel: confirmationLevels_1.default.PENDING,
        email: requestBody.email.toLowerCase(),
    };
    const update = {
        confirmationToken: Crypto.randomBytes(32).toString('hex'),
    };
    const updatedUser = await dal.updateUser(query, update);
    if (!updatedUser) {
        throw new Error(errors_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
    }
    await helpers.sendConfirmationEmail({
        user: updatedUser,
        redirectUrl: requestBody.redirectUrl,
    });
    return updatedUser;
};
exports.resendConfirmationEmail = resendConfirmationEmail;
const confirmAccount = async (requestBody) => {
    validator.validateConfirmAccountRequest(requestBody);
    const query = {
        confirmationLevel: confirmationLevels_1.default.PENDING,
        confirmationToken: requestBody.token,
    };
    const update = {
        confirmationToken: Crypto.randomBytes(32).toString('hex'),
        confirmationLevel: confirmationLevels_1.default.CONFIRMED,
    };
    const updatedUser = await dal.updateUser(query, update);
    if (!updatedUser) {
        throw new Error(errors_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
    }
    return updatedUser;
};
exports.confirmAccount = confirmAccount;
const logIn = async (requestBody) => {
    validator.validateLogInRequest(requestBody);
    const user = await dal.findUser({ query: { email: requestBody.email.toLowerCase() } });
    checkIfEmailExists(user);
    await checkIfPasswordsMatch(user.password, requestBody.password);
    checkIfUserAccountIsNotConfirmed(requestBody.confirmationLevel);
    const sessionToken = (0, jwt_1.createToken)(requestBody);
    const userWithToken = Object.assign(Object.assign({}, user.toJSON()), { token: sessionToken });
    // delete userWithToken.password;
    delete userWithToken.twoFactorAuth.secret;
    // if (user?.twoFactorAuth.active) {
    //   return {twoFactorAuth} : true)
    // } else
    return userWithToken;
};
exports.logIn = logIn;
async function checkIfPasswordsMatch(existingPassword, givenPassword) {
    const passwordsMatch = await bcrypt_1.default.compare(givenPassword, existingPassword);
    if (!passwordsMatch) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_PASSWORD);
    }
}
function checkIfEmailExists(user) {
    if (!user) {
        throw new errors_2.NotAuthenticated(errors_1.default.USER_NOT_FOUND);
    }
}
function checkIfUserAccountIsNotConfirmed(currentConfirmationLevel) {
    const accountNotConfirmed = currentConfirmationLevel === confirmationLevels_1.default.PENDING;
    if (accountNotConfirmed) {
        throw new errors_2.NotAuthenticated(errors_1.default.ACCOUNT_NOT_CONFIRMED);
    }
}
const requestNewPassword = async (requestBody) => {
    validator.validateResetPasswordRequest(requestBody);
    const confirmationToken = Crypto.randomBytes(32).toString('hex');
    const query = { email: requestBody.email.toLowerCase() };
    const update = { confirmationToken };
    const updatedUser = await dal.updateUser(query, update);
    checkIfUserAccountExists(updatedUser);
    await helpers.sendEmailWithResetPasswordLink({
        user: updatedUser,
        redirectUrl: requestBody.redirectUrl,
    });
};
exports.requestNewPassword = requestNewPassword;
function checkIfUserAccountExists(user) {
    if (!user) {
        throw new errors_2.NotFound(errors_1.default.USER_NOT_FOUND);
    }
}
const resetPassword = async (requestBody) => {
    validator.validatePasswordUpdateRequest(requestBody);
    const salt = await bcrypt_1.default.genSalt();
    const hashedPassword = await bcrypt_1.default.hash(requestBody.password, salt);
    const query = { confirmationToken: requestBody.token };
    const update = { password: hashedPassword };
    const updatedUser = await dal.updateUser(query, update);
    checkIfUserAccountExists(updatedUser);
};
exports.resetPassword = resetPassword;
const initTwoFactorAuthentication = async (userId) => {
    const query = { _id: userId };
    const user = await dal.findUser({ query });
    checkIfUserAccountExists(user);
    const secret = twoFactorAuth.generateSecret(user.email);
    const qrCodeBase64 = await twoFactorAuth.generateQRCode(secret);
    const update = { twoFactorAuth: { active: true } };
    await dal.updateUser(query, update);
    return qrCodeBase64;
};
exports.initTwoFactorAuthentication = initTwoFactorAuthentication;
const completeTwoFactorAuthentication = async (userId, requestBody) => {
    validator.validateCompleteTwoFactorAuthRequest(requestBody);
    const { token } = requestBody;
    const query = { _id: userId };
    const user = await dal.findUser({ query });
    checkIfUserAccountExists(user);
    checkIfTwoFactorAuthIsEnabled(user);
    checkIfTokenIsValid(user, token);
    const update = { twoFactorAuth: { active: true } };
    await dal.updateUser(query, update);
};
exports.completeTwoFactorAuthentication = completeTwoFactorAuthentication;
function checkIfTwoFactorAuthIsEnabled(user) {
    if (!user.twoFactorAuth.secret) {
        throw new errors_2.UnprocessableEntity(errors_1.default.NO_2FA);
    }
}
function checkIfTokenIsValid(user, token) {
    const tokenIsNotValid = !twoFactorAuth.validateToken(user.twoFactorAuth.secret, token);
    if (tokenIsNotValid) {
        throw new errors_2.UnprocessableEntity(errors_1.default.INVALID_2FA_TOKEN);
    }
}
const verifyTwoFactorAuthToken = async (userId, requestBody) => {
    validator.validateVerifyTwoFactorAuthTokenRequest(requestBody);
    const { token } = requestBody;
    const user = await dal.findUser({ query: { _id: userId } });
    checkIfUserAccountExists(user);
    checkIfTwoFactorAuthIsActivated(user);
    checkIfTokenIsValid(user, token);
};
exports.verifyTwoFactorAuthToken = verifyTwoFactorAuthToken;
function checkIfTwoFactorAuthIsActivated(user) {
    if (!user.twoFactorAuth.active) {
        throw new errors_2.UnprocessableEntity(errors_1.default.NO_2FA);
    }
}
