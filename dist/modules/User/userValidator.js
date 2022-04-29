"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatchUserRequest = void 0;
/* eslint-disable import/prefer-default-export */
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../../utils/errors");
const validatePatchUserRequest = (input) => {
    var _a;
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        genres: joi_1.default.array().items(joi_1.default.string()).min(1),
    }).required();
    const result = schema.validate(input);
    if (result.error) {
        throw new errors_1.BadRequest((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.details, '');
    }
};
exports.validatePatchUserRequest = validatePatchUserRequest;
