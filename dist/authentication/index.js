"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = exports.jwtAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_1 = __importDefault(require("./jwt"));
const basic_1 = __importDefault(require("./basic"));
const jwtAuth = () => {
    passport_1.default.use(jwt_1.default);
};
exports.jwtAuth = jwtAuth;
exports.basicAuth = basic_1.default;
