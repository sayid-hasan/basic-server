// create a validation schema for studentData using joi package

import Joi from 'joi';

// Helper function for capitalized validation
const capitalizeValidator = (value, helpers) => {
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
  if (value !== capitalizedValue) {
    return helpers.message(`${value} must be in capitalized format`);
  }
  return value;
};

// Joi Schemas
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(10)
    .custom(capitalizeValidator, 'Custom capitalize validation')
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.max': 'First name can’t exceed 10 characters',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string().trim().required().messages({
    'any.required': 'Middle name is required',
  }),
  lastName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
      'any.required': 'Last name is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().isoDate().allow(null, ''),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'any.required': 'Email is required',
  }),
  avatar: Joi.string().uri().allow(null, ''),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  BloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().allow(null, ''),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .required()
    .default('active')
    .messages({
      'any.only': '{#value} must be either active or blocked',
    }),
});
export default studentValidationSchema;
