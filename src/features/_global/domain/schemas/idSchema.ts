import { z } from 'zod';

export const idSchema = z.object({
  id: z.number({ message: 'Debe ingresar el id' }),
});

// To string id from postgresql with cuid()
export const arrayIdSchema = z.object({
  id: z.array(z.string().cuid()),
});
