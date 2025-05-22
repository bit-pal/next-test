import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'validation.email.invalid' }),
  password: z.string().min(6, { message: 'validation.password.tooShort' }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: 'validation.email.invalid' }),
  password: z.string().min(6, { message: 'validation.password.tooShort' }),
  confirmPassword: z.string().min(6, { message: 'validation.password.tooShort' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.password.noMatch',
  path: ['confirmPassword'],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;