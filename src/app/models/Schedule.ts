import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface ISchedule extends Document {
  scheduleNr: string;
  departureTime: Date;
  arrivalTime: Date;
  ticketPrice: number,
  startingAirport: string,
  landingAirport: string
}

export const ScheduleSchema: Schema = new Schema(
  {
    scheduleNr: { type: String },
    departure: { type: Date },
    arrival: { type: Date },
    ticketPrice: { type: Number },
    startingAirport: { type: String },
    landingAirport: { type: String },
  },
);

export default mongoose.model<ISchedule>(dbTables.SCHEDULE, ScheduleSchema);
