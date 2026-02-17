import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TFullName,
  TUsersData,
  UserModelType,
} from './users.interface';
import config from '../../config';
const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street address is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const usersDataSchema = new Schema<TUsersData, UserModelType>({
  userId: {
    type: Number,
    required: [true, 'UserId is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxLength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: { type: fullNameSchema, required: [true, 'Full Name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Valid Email is required'],
    unique: true,
  },
  isActive: { type: String, enum: ['Active', 'DeActive'], default: 'Active' },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  isDeleted: { type: Boolean, default: false },
});
// mongoose pre save hook middleware
usersDataSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

// Post save hook middleware
usersDataSchema.post('save', function () {
  this.password = '';
});

// query middleware
usersDataSchema.pre('find', function () {
  this.find({ isDeleted: { $ne: true } });
});
usersDataSchema.pre('findOne', function () {
  this.findOne({ isDeleted: { $ne: true } });
});

// Creating a custom static method
usersDataSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UsersManagementModel.findOne({ userId });
  return existingUser;
};

// Create a Model

export const UsersManagementModel = model<TUsersData, UserModelType>(
  'user',
  usersDataSchema,
);
