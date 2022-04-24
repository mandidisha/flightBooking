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
/* eslint-disable quotes */
/* eslint-disable no-undef */
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const sinon_1 = require("sinon");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const faker_1 = __importDefault(require("@faker-js/faker"));
const dal = __importStar(require("./authDal"));
const mailService = __importStar(require("../../providers/mail/sendgrid"));
const app_1 = __importDefault(require("../../app"));
const errors_1 = __importDefault(require("../../providers/errors"));
const jwt_1 = require("../../authentication/jwt");
const twoFactorAuth_1 = require("../../authentication/twoFactorAuth");
chai_1.default.use(chai_http_1.default);
describe('Test "Auth" endpoints', () => {
    const email = faker_1.default.internet.email();
    let confirmationToken;
    const password = 'Ran@0m?pass';
    let userToken;
    let twoStepAuthSecretKey;
    let sendEmailStub;
    before(async () => {
        await dal.deleteUsers({ query: {} });
        sendEmailStub = (0, sinon_1.stub)(mailService, 'sendEmail').resolves();
    });
    /**
     * Endpoint: "POST /auth/register"
     */
    it('Test "POST /auth/register" (Success test case)', async () => {
        const body = {
            firstName: faker_1.default.name.firstName(),
            lastName: faker_1.default.name.lastName(),
            email,
            password,
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/register')
            .send(body);
        chai_1.default.expect(response.status).to.equal(204);
    });
    it('Test "POST /auth/register" (Fail test case: Duplicate emails)', async () => {
        const body = {
            firstName: faker_1.default.name.firstName(),
            lastName: faker_1.default.name.lastName(),
            email,
            password,
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/register')
            .send(body);
        chai_1.default.expect(response.status).to.equal(422);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.DUPLICATE_EMAILS);
    });
    it('Test "POST /auth/resend-confirmation-email" (Fail test case: No results found)', async () => {
        const body = {
            email: 'not@found.com',
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post(`/auth/resend-confirmation-email`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(404);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
    });
    it('Test "POST /auth/resend-confirmation-email" (Success test case)', async () => {
        const body = {
            email,
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post(`/auth/resend-confirmation-email`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(204);
    });
    /**
     * Endpoint: "POST /auth/login"
     */
    it('Test "POST /auth/login" (Fail test case: Account not confirmed)', async () => {
        const body = {
            email,
            password,
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/login')
            .send(body);
        chai_1.default.expect(response.status).to.equal(401);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.ACCOUNT_NOT_CONFIRMED);
    });
    /**
     * Endpoint: "PUT /auth/confirmation"
     */
    it('Test "PUT /auth/confirmation" (Success test case)', async () => {
        const user = await dal.findUser({ query: { email: email.toLowerCase() } });
        confirmationToken = user.confirmationToken;
        const response = await chai_1.default.request(app_1.default)
            .put(`/auth/confirmation?token=${confirmationToken}`);
        chai_1.default.expect(response.status).to.equal(204);
    });
    it('Test "PUT /auth/confirmation" (Fail test case: No results found)', async () => {
        const response = await chai_1.default.request(app_1.default)
            .put(`/auth/confirmation?token=${confirmationToken}`);
        chai_1.default.expect(response.status).to.equal(404);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED);
    });
    /**
    * Endpoint: "POST /auth/login"
    */
    it('Test "POST /auth/login" (Fail test case: Email not found)', async () => {
        const body = {
            email: faker_1.default.internet.email(),
            password,
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/login')
            .send(body);
        chai_1.default.expect(response.status).to.equal(401);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.USER_NOT_FOUND);
    });
    it('Test "POST /auth/login" (Fail test case: Invalid password)', async () => {
        const body = {
            email,
            password: 'Invalid',
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/login')
            .send(body);
        chai_1.default.expect(response.status).to.equal(401);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.INVALID_PASSWORD);
    });
    it('Test "POST /auth/login" (Success test case)', async () => {
        const body = {
            email,
            password,
        };
        const response = await chai_1.default.request(app_1.default)
            .post('/auth/login')
            .send(body);
        const token = (0, jwt_1.createToken)(response.body);
        chai_1.default.expect(response.status).to.equal(200);
        chai_1.default.expect(response.body).to.have.all.keys('__v', '_id', 'firstName', 'lastName', 'email', 'isAdmin', 'twoFactorAuth', 'confirmationLevel', 'confirmationToken', 'createdAt', 'updatedAt', 'token');
        chai_1.default.expect(response.body.token).to.equal(token);
        userToken = `Bearer ${response.body.token}`;
    });
    /**
     * Endpoint: "POST /auth/request-new-password"
     */
    it('Test "POST /auth/request-new-password" (Fail test case: User not found)', async () => {
        const body = {
            email: 'not.found@example.com',
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post(`/auth/request-new-password`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(404);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.USER_NOT_FOUND);
    });
    it('Test "POST /auth/request-new-password" (Success test case)', async () => {
        const body = {
            email,
            redirectUrl: faker_1.default.internet.url(),
        };
        const response = await chai_1.default.request(app_1.default)
            .post(`/auth/request-new-password`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(204);
    });
    /**
    * Endpoint: "PUT /auth/password"
    */
    it('Test "PUT /auth/password" (Fail test case: User not found)', async () => {
        const body = {
            token: crypto_1.default.randomBytes(32).toString('hex'),
            password: 'Ran@0m?pass2',
        };
        const response = await chai_1.default.request(app_1.default)
            .put(`/auth/password`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(404);
        chai_1.default.expect(response.body.details).to.equal(errors_1.default.USER_NOT_FOUND);
    });
    it('Test "PUT /auth/password" (Success test case)', async () => {
        const user = await dal.findUser({ query: { email: email.toLowerCase() } });
        const body = {
            token: user.confirmationToken,
            password: 'Ran@0m?pass2',
        };
        const response = await chai_1.default.request(app_1.default)
            .put(`/auth/password`)
            .send(body);
        chai_1.default.expect(response.status).to.equal(204);
        const updatedUser = await dal.findUser({ query: { email: email.toLowerCase() } });
        const passwordsMatch = bcryptjs_1.default.compareSync(body.password, updatedUser.password);
        chai_1.default.expect(passwordsMatch).to.equal(true);
    });
    /**
   * Endpoint: "PUT /auth/two-factor-auth/initialization"
   */
    it('Test "PUT /auth/two-factor-auth/initialization" (Success test case)', async () => {
        const response = await chai_1.default.request(app_1.default)
            .put(`/api/v1/auth/two-factor-auth/initialization`)
            .set('authorization', userToken);
        chai_1.default.expect(response.status).to.equal(200);
        chai_1.default.expect(response.text).to.be.a('string');
        const user = await dal.findUser({ query: { email: email.toLowerCase() } });
        chai_1.default.expect(user.twoFactorAuth).to.be.an('object');
        twoStepAuthSecretKey = user.twoFactorAuth.secret;
    });
    /**
     * Endpoint: "PUT /auth/two-factor-auth/activation"
     */
    it('Test "PUT /auth/two-factor-auth/activation" (Success test case)', async () => {
        const response = await chai_1.default.request(app_1.default)
            .put(`/auth/two-factor-auth/activation`)
            .set('authorization', userToken)
            .send({ token: (0, twoFactorAuth_1.generateToken)(twoStepAuthSecretKey) });
        chai_1.default.expect(response.status).to.equal(204);
        const updatedUser = await dal.findUser({ query: { email: email.toLowerCase() } });
        chai_1.default.expect(updatedUser.twoFactorAuth.active).to.equal(true);
        chai_1.default.expect(updatedUser.twoFactorAuth.secret).to.be.an('object');
    });
    /**
     * Endpoint: "HEAD /auth/two-factor-auth/verification"
     */
    it('Test "HEAD /auth/two-factor-auth/verification" (Success test case)', async () => {
        const response = await chai_1.default.request(app_1.default)
            .head(`/auth/two-factor-auth/verification?token=${(0, twoFactorAuth_1.generateToken)(twoStepAuthSecretKey)}`)
            .set('authorization', userToken);
        chai_1.default.expect(response.status).to.equal(200);
    });
    after(async () => {
        await dal.deleteUsers({ query: {} });
        sendEmailStub.restore();
    });
});
