import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface ISecret extends Document{
  otpauth_url:string;
  base32:string;
  hex:string;
  ascii:string;
}
export interface IUser extends Document {

  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  firstName: string;
  lastName: string;
  twoFactorAuth: boolean;
  isAdmin: boolean;
  gender: string;
  secret: ISecret;
}

export const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    twoFactorAuth: { type: Boolean },
    isAdmin: { type: Boolean, required: true },
    gender: { type: String, required: true },
    secret: {
      type: {
        ascii: { type: 'String' },
        hex: { type: 'String' },
        base32: { type: 'String' },
        otpauth_url: { type: 'String' },
      },
      required: false,
    },

  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>(dbTables.USER, UserSchema);
