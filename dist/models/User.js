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
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dbTables_1 = __importDefault(require("../providers/dbTables"));
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    twoFactorAuth: {
        type: {
            active: { type: Boolean },
            secret: {
                type: {
                    ascii: { type: 'String' },
                    hex: { type: 'String' },
                    base32: { type: 'String' },
                    otpauth_url: { type: 'String' },
                },
            },
        },
    },
    isAdmin: { type: Boolean, required: true },
    gender: { type: String, required: true },
    confirmationToken: { type: Boolean, required: true },
    confirmationLevel: { type: Number, required: true },
    secret: {
        type: {
            ascii: { type: 'String' },
            hex: { type: 'String' },
            base32: { type: 'String' },
            otpauth_url: { type: 'String' },
        },
        required: false,
    },
}, {
    timestamps: true,
    collection: dbTables_1.default.USER,
});
exports.default = mongoose_1.default.model(dbTables_1.default.USER, exports.UserSchema);
