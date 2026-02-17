import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUsersData } from './users.interface';
const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street address is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const usersDataSchema = new Schema<TUsersData>({
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

// Create a Model

export const UsersManagementModel = model<TUsersData>('user', usersDataSchema);
