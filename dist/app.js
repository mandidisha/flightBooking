const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const body_parser_1 = __importDefault(require('body-parser'));
const express_1 = __importDefault(require('express'));
const mongoose_1 = __importDefault(require('mongoose'));
const development_1 = __importDefault(require('./modules/providers/development'));

const app = (0, express_1.default)();
// const port = 8000
mongoose_1.default.connect(development_1.default.databaseUrl, {
  directConnection: true,
});
app.get('/', (req, res) => {
  res.send(req.body);
});
app.get('/help', (req, res) => {
  res.send('help page');
});
app.use(body_parser_1.default.json());
app.listen(development_1.default.port, () => console.log(`app running on port ${development_1.default.port}`));
