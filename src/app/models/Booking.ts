import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface IBooking extends Document {
  seatNr: number;
  user: string;
  schedule:string;
}

export const BookingSchema: Schema = new Schema({
  seatNr: { type: Number },
  user: [{ type: Schema.Types.ObjectId, ref: dbTables.USER }],
  schedule: [{ type: Schema.Types.ObjectId, ref: dbTables.SCHEDULE }],
});

export default mongoose.model<IBooking>(dbTables.BOOKING, BookingSchema);
