import mongoose, { Schema, Document } from 'mongoose';
import dbTables from '../providers/dbTables';

export interface ISecret {
  otpauth_url: string;
  base32: string;
  hex: string;
  ascii: string;
}

export interface ITwoFactor {
  active: boolean;
  secret?: ISecret;
}
export interface IUser extends Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  firstName: string;
  lastName: string;
  twoFactorAuth: ITwoFactor;
  isAdmin: boolean;
  gender: string;
  confirmationToken: boolean;
  confirmationLevel: number;
  secret: string;
}

export interface IRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmationToken: string;
  confirmationLevel: number;
  isAdmin: boolean;
  twoFactorAuth: boolean;
  redirectUrl: string;
  token: string;
}
// create
// updateUser
// costum types for update and create

export interface IUpdate {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  confirmationToken?: string;
  confirmationLevel?: number;
  twoFactorAuth?: ITwoFactor;
}

export interface IQuery extends Document {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}
export interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    twoFactorAuth: {
      type: {
        active: { type: Boolean },
        secret: {
          type: {
            ascii: { type: 'String' },
            hex: { type: 'String' },
            base32: { type: 'String' },
            otpauth_url: { type: 'String' },
          },
        },
      },
    },
    isAdmin: { type: Boolean, required: true },
    gender: { type: String, required: true },
    confirmationToken: { type: Boolean, required: true },
    confirmationLevel: { type: Number, required: true },
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
    collection: dbTables.USER,
  },
);

export default mongoose.model<IUser>(dbTables.USER, UserSchema);
