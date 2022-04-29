"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quotes */
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
// import swaggerUi from 'swagger-ui-express';
// import { jwtAuth } from './authentication';
const development_1 = __importDefault(require("./providers/development"));
// import Airplanes from './models/Airplanes';
// import Airport from './models/Airport';
const app = (0, express_1.default)();
// const port = 8000
const server = http_1.default.createServer(app);
mongoose_1.default.connect(development_1.default.databaseUrl, {
    directConnection: true,
});
app.get('/first', (req, res) => {
    res.send('COnnnected');
});
app.get('/help', (req, res) => {
    res.send('help page');
});
const docsFilePath = path_1.default.resolve(__dirname, '../src/docs/openapi.yaml');
const jsonDocsFile = yamljs_1.default.load(docsFilePath);
const docs = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: jsonDocsFile,
    apis: ['./src/app/**/*.ts'],
});
app.use('/api/swagger', 
// basicAuth(config.apiDocsUsername, config.apiDocsPassword!, true),
swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs));
app.use('/api/v1', routes_1.default);
app.use(express_1.default.json);
// jwtAuth();
app.use(body_parser_1.default.json());
server.listen(development_1.default.port, () => console.log(`app running on port ${development_1.default.port}`));
exports.default = server;
