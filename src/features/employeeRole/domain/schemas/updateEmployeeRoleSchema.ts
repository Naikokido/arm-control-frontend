import { z } from "zod";

export const updateEmployeeRoleSchema = z.object({
  name: z.string({ message: "Debe ingresar el nombre" }),
  enabled: z
    .string()
    .refine(
      (value) => {
        return value === "on";
      },
      {
        message: "Debe indicar un valor válido",
      }
    )
    .optional(),
});
