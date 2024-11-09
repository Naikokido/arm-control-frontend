import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
// import { useNotification } from "@core/contexts/NotificationContext.tsx";
import { useNotification } from "../../../../core/contexts/NotificationContext.tsx";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { createEmployeeRoleSchema } from "../../domain";
import { RiHome4Line } from "@remixicon/react";
import Nav from "../../../_global/presentation/components/ui/layout/Nav.tsx";
import Container from "../../../_global/presentation/components/ui/layout/Container.tsx";
import { EmployeeRoleForm } from "../components";
import { createEmployeeRole } from "./controller.ts";

export const EmployeeRoleCreatePage: FC = () => {
  const { setNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    (formData: FormData) => {
      setLoading(true);
      type EmployeeRoleKeys = keyof z.infer<typeof createEmployeeRoleSchema>;
      const formFields = createEmployeeRoleSchema.keyof().options;
      const formValues = Object.fromEntries(
        formFields.map((field) => [field, formData.get(field) as string])
      ) as Record<EmployeeRoleKeys, string>;

      createEmployeeRole
        .execute({
          name: formValues.name,
          enabled: formValues.enabled === "on",
        })

        .then((response) => {
          setLoading(false);
          const notificationTitle = "Crear rol de funcionario";

          if (response.error?.message) {
            setNotification({
              type: "error",
              message: response.error.message,
              title: notificationTitle,
            });

            return;
          }

          if (response.data?.id) {
            setNotification({
              title: notificationTitle,
              type: "success",
              message: "Rol creado con éxito",
            });

            navigate("/app/roles-de-funcionarios");

            return;
          }
        });
    },
    [navigate, setNotification]
  );

  const navItems = useMemo(
    () => [
      {
        title: "Home",
        icon: RiHome4Line,
        href: "/app/home",
      },
      {
        title: "Roles de funcionarios",
        href: "/app/roles-de-funcionarios",
      },
      {
        title: "Crear",
        href: "/app/roles-de-funcionarios/crear",
      },
    ],
    []
  );

  return (
    <>
      <Nav title="Crear Roles de funcionario" navItems={navItems} />
      <Container>
        <EmployeeRoleForm loading={loading} onSubmitData={handleOnSubmit} />
      </Container>
    </>
  );
};
