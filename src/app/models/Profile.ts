import mongoose, { Schema } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}
export const ProfileSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },

});

export default mongoose.model<IProfile>(dbTables.PROFILE, ProfileSchema);
