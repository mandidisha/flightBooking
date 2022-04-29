"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeWriteRequest = void 0;
const errors_1 = require("../../utils/errors");
// eslint-disable-next-line import/prefer-default-export
const authorizeWriteRequest = (user) => {
    if (!user.isAdmin) {
        throw new errors_1.NotAuthorized('User is not admin ', '');
    }
};
exports.authorizeWriteRequest = authorizeWriteRequest;
