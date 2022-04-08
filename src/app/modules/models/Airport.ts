import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface IAirport extends Document {
  airportName: string;
  country: string;
  city: string;
}

export const AirportSchema: Schema = new Schema(
  {
    airportName: { type: String },
    country: { type: String },
    city: { type: String },
  },
);

export default mongoose.model<IAirport>(dbTables.AIRPORT, AirportSchema);
