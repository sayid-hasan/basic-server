import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    trim: true, // ignore all the space in front and end

    maxlength: [10, 'first Name cant exceed the 10 chars'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} must be in capitalized format',
    },
  },
  middleName: { type: String, required: true, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      // this keywoed use na hole  arrow function use korte parbe
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} must contain only alphabatic characters',
    },
  },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true },
});
// 2. create a schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'name is required bro'], // custom error message
  },
  gender: {
    // way to show custom error message
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  avatar: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
    default: 'active',
  },
});

// 3. create a model
export const StudentModel = model<Student>('Student', studentSchema);
