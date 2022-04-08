const __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  let desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function (o, v) {
  o.default = v;
});
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  const result = {};
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.AirportSchema = void 0;
const mongoose_1 = __importStar(require('mongoose'));

exports.AirportSchema = new mongoose_1.Schema({
  airportName: { type: String },
  country: { type: String },
  city: { type: String },
});
exports.default = mongoose_1.default.model('Airport', exports.AirportSchema);
