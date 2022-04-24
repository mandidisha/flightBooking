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
exports.authenticated = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = require("joi");
const development_1 = __importDefault(require("../providers/development"));
const dal = __importStar(require("../modules/auth/authDal"));
const errors_1 = require("../utils/errors");
const errors_2 = __importDefault(require("../providers/errors"));
const createToken = (user) => jsonwebtoken_1.default.sign({
    _id: user.id,
    isAdmin: user.isAdmin,
    isSecondFactorAuthenticated: joi_1.boolean,
    confirmationToken: user.confirmationToken,
}, development_1.default.jwtSecretKey);
exports.createToken = createToken;
const authenticated = (omitSecondFactor = false) => async (request, response, next) => {
    try {
        const authHeader = request.headers.Authorization || '';
        const token = authHeader.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, development_1.default.jwtSecretKey);
        const { _id, isSecondFactorAuthenticated } = decodedToken;
        const query = { _id };
        const user = await dal.findUser({ query });
        if (!user)
            throw new errors_1.NotFound(errors_2.default.AUTH_USER_NOT_FOUND);
        if (!omitSecondFactor && user.twoFactorAuth.active && !isSecondFactorAuthenticated) {
            throw new errors_1.NotAuthenticated(errors_2.default.AUTH_INVALID_2FA_TOKEN);
        }
        // request.user = decodedToken;
        next();
    }
    catch (e) {
        throw new errors_1.NotAuthenticated('Not authenticated');
    }
};
exports.authenticated = authenticated;
