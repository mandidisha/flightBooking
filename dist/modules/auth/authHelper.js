"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithResetPasswordLink = exports.sendConfirmationEmail = void 0;
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const inline_css_1 = __importDefault(require("inline-css"));
const sendgrid_1 = require("../../providers/mail/sendgrid");
const urlUtils_1 = require("../../helpers/urlUtils");
// eslint-disable-next-line import/prefer-default-export
const sendConfirmationEmail = async ({ user, redirectUrl }) => {
    const confirmationURL = (0, urlUtils_1.getRedirectUrl)(redirectUrl, `token=${user.confirmationToken}`);
    const name = user.firstName;
    const emailContent = await ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../templatesMail/accountConfirmation'), {
        user: name || '',
        confirmationLink: confirmationURL,
    });
    const html = await (0, inline_css_1.default)(emailContent, {
        url: ' ',
        applyStyleTags: true,
    });
    await (0, sendgrid_1.sendEmail)({
        to: user.email,
        subject: 'Account Confirmation',
        html,
    });
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendEmailWithResetPasswordLink = async ({ user, redirectUrl }) => {
    const emailContent = await ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../../../templates/mail/reset_password_instructions.ejs'), {
        user: user.firstName,
        resetPasswordUrl: (0, urlUtils_1.getRedirectUrl)(redirectUrl, `token=${user.confirmationToken}`),
    });
    const html = await (0, inline_css_1.default)(emailContent, {
        url: ' ',
        applyStyleTags: true,
    });
    await (0, sendgrid_1.sendEmail)({
        to: user.email,
        subject: 'Reset Password Instructions',
        html,
    });
};
exports.sendEmailWithResetPasswordLink = sendEmailWithResetPasswordLink;
