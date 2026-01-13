import {z} from 'zod';

export const registerSchema = z.object({
  name: z.string()
          .min(3, 'Nombre muy corto')
          .max(50, 'Nombre muy largo'),
  email: z.email('Email no válido'),
  password: z
            .string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'La contraseña no es segura')
})