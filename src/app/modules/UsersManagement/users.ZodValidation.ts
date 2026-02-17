import z from 'zod';
const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
});
const addressValidationSchema = z.object({
  street: z.string().trim().min(1, 'Street is required'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
});

export const usersDataValidationSchema = z.object({
  userId: z.number().min(1, 'UserId is required'),
  userName: z.string().trim().min(1, 'UserName is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(20, 'Password can not be more than 20 characters'),
  fullName: fullNameValidationSchema,
  age: z.number().min(1, 'age is required'),
  email: z.email('Valid email is required'),
  isActive: z.enum(['Active', 'DeActive']).default('Active'),
  hobbies: z
    .array(z.string().trim().min(1))
    .min(1, 'At least one hobby is required'),
  address: addressValidationSchema,
  isDeleted: z.boolean(),
});
