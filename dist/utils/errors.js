"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntity = exports.NotAuthorized = exports.NotFound = exports.BadRequest = exports.NotAuthenticated = exports.GeneralError = void 0;
/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line lines-between-class-members
const util_1 = __importDefault(require("util"));
const cuid_1 = __importDefault(require("cuid"));
class GeneralError extends Error {
    constructor(code, name, message, details, logOnly) {
        super();
        this.code = code;
        this.debugId = (0, cuid_1.default)();
        this.name = name;
        this.message = message;
        this.details = details;
        this.logOnly = logOnly || false;
    }
    printForHTTPResponse() {
        return {
            code: this.debugId,
            name: this.name,
            message: this.message,
            details: this.code === 500 ? '' : this.details,
        };
    }
    printForLogging() {
        return {
            code: this.code,
            debugId: this.debugId,
            name: this.name,
            message: this.message,
            path: this.path,
            details: typeof (this.details) === 'object'
                ? util_1.default.inspect(this.details)
                : this.details,
        };
    }
    getCode() {
        return this.code;
    }
    setPath(path) {
        this.path = path;
    }
}
exports.GeneralError = GeneralError;
class NotAuthenticated extends GeneralError {
    constructor(details, logOnly) {
        super(401, 'Not Authenticated', 'Missing authentication or invalid credentials', details, logOnly);
    }
}
exports.NotAuthenticated = NotAuthenticated;
class BadRequest extends GeneralError {
    constructor(details, logOnly) {
        super(400, 'Bad Request', 'Your request contains invalid or missing data', details, logOnly);
    }
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
    constructor(details, logOnly) {
        super(404, 'Not Found', 'The requested item was not found', details, logOnly);
    }
}
exports.NotFound = NotFound;
class NotAuthorized extends GeneralError {
    constructor(details, logOnly) {
        super(403, 'Not Authorized / Forbidden', 'Your request cannot be completed due to missing permissions', details, logOnly);
    }
}
exports.NotAuthorized = NotAuthorized;
class UnprocessableEntity extends GeneralError {
    constructor(details, logOnly) {
        super(422, 'Unprocessable Entity', 'Your request was understood but could not be completed due to semantic errors', details, logOnly);
    }
}
exports.UnprocessableEntity = UnprocessableEntity;
