"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = exports.generateQRCode = exports.generateSecret = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
/**
 * Generates a unique secret key for each user.
 */
const generateSecret = (userEmail) => speakeasy_1.default.generateSecret({
    length: 32,
    issuer: 'FlightBooking',
    name: `FlightBooking (${userEmail})`,
});
exports.generateSecret = generateSecret;
/**
 * Generates a QR code.
 *
 * @param {String} secret
 */
const generateQRCode = (secret) => new Promise((resolve, reject) => {
    qrcode_1.default.toDataURL(secret.otpauth_url, (err, imageData) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(imageData);
        }
    });
});
exports.generateQRCode = generateQRCode;
/**
 * Generates a token from a secret key.
 *
 * @param {String} secret
 */
const generateToken = (secret) => {
    const token = speakeasy_1.default.totp({
        secret: secret.base32,
        encoding: 'base32',
    });
    return token;
};
exports.generateToken = generateToken;
/**
 * Verifies a given token.
 *
 * @param {String} secret: User secret key stored on the db
 * @param {String} userToken: Token provided by the user request.
 */
const validateToken = (secret, userToken) => speakeasy_1.default.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: userToken,
});
exports.validateToken = validateToken;
