"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.createToken = void 0;
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const development_1 = __importDefault(require("../modules/providers/development"));
const opts = {
    secretOrKey: development_1.default.jwtSecretKey,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const createToken = (user) => jsonwebtoken_1.default.sign({
    _id: user.id,
    isAdmin: user.isAdmin,
}, opts.secretOrKey);
exports.createToken = createToken;
const verify = (token, done) => {
    if ((token === null || token === void 0 ? void 0 : token.id) && (token === null || token === void 0 ? void 0 : token.isAdmin) !== undefined) {
        done(null, token);
    }
    else {
        done(null, false);
    }
};
exports.verify = verify;
exports.default = new passport_jwt_1.Strategy(opts, exports.verify);
