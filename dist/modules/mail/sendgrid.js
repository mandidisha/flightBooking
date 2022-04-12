"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const development_1 = __importDefault(require("../providers/development"));
mail_1.default.setApiKey(development_1.default.mailServiceApiKey);
/**
 * Creates and sends an email.
 *
 * @param from
 * @param to
 * @param subject
 * @param html: Email content formatted as HTML
 * @param attachments: Attachments
 */
// eslint-disable-next-line import/prefer-default-export
const sendEmail = ({ params }) => new Promise((resolve, reject) => {
    const body = Object.assign(Object.assign({}, params), { from: {
            email: params.from || development_1.default.mailServiceSender,
            name: development_1.default.appName,
        } });
    if (params.attachments) {
        body.attachments = params.attahments;
    }
    mail_1.default.send(body, false, (error, info) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(info);
        }
    });
});
exports.sendEmail = sendEmail;
