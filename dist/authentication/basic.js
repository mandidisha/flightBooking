"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const auth = (userName, password, challenge) => (0, express_basic_auth_1.default)({
    users: {
        [userName]: password,
    },
    challenge,
});
exports.default = auth;
