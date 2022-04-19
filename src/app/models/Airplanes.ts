import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface IAirplane extends Document {
  airplaneNumber: number;
  airplaneModel: string;
  numberOfSeats: number;
  // airoport: string;
}

export const AirplaneSchema: Schema = new Schema(
  {
    airplaneNumber: { type: Number },
    airplaneModel: { type: String },
    numberOfSeats: { type: Number },
    // airoport: [{ type: Schema.Types.ObjectId, ref: 'Airoport' }]
  },
);
export default mongoose.model<IAirplane>(dbTables.AIRPLANE, AirplaneSchema);
