import { z } from "zod";

export const createUserSchema = z.object({
  fullname: z.string({ message: "Debe ingresar el nombre" }),
  email: z.string({ message: 'Debe ingresar el correo electrónico' }).email({ message: 'Debe ingresar el formato correcto del correo' }),
  password: z.string({ message: 'Debe ingresar la contraseña' }).min(6, 'Debe tener al menos 6 caracteres'),
  role: z.string({ message: 'Debe ingresar el role' }),
  phone: z.string({ message: 'Debe ingresar el phone' }),

});
