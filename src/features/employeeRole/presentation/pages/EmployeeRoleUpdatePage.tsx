import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../../core/contexts/NotificationContext.tsx";
import type { EmployeeRoleEntity } from "../../domain";
import { updateEmployeeRoleSchema } from "../../domain";
import type { z } from "zod";
import { RiHome4Line } from "@remixicon/react";
import Nav from "../../../_global/presentation/components/ui/layout/Nav.tsx";
import Container from "../../../_global/presentation/components/ui/layout/Container.tsx";
import RecordNotFound from "../../../_global/presentation/components/ui/layout/RecordNotFound.tsx";
import { EmployeeRoleForm } from "../components";
import { getEmployeeRoleById, updateEmployeeRole } from "./controller.ts";

export const EmployeeRoleUpdatePage: FC = () => {
  const { employeeRoleId = "" } = useParams();
  const { setNotification } = useNotification();
  const [employeeRole, setEmployeeRole] = useState<EmployeeRoleEntity | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotfound] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    (formData: FormData) => {
      setLoading(true);
      type EmployeeRoleKeys = keyof z.infer<typeof updateEmployeeRoleSchema>;
      const formFields = updateEmployeeRoleSchema.keyof().options;
      const formValues = Object.fromEntries(
        formFields.map((field) => [field, formData.get(field) as string])
      ) as Record<EmployeeRoleKeys, string>;
      updateEmployeeRole
        .execute({
          id: employeeRoleId,
          name: formValues.name,
          enabled: formValues.enabled === "on",
        })
        .then((response) => {
          setLoading(false);
          const notificationTitle = "Editar rol de funcionario";

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
              message: "Rol editado con éxito",
            });

            navigate("/app/roles-de-funcionarios");

            return;
          }
        });
    },
    [employeeRoleId, navigate, setNotification]
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
        title: "Editar",
        href: `/app/roles-de-funcionarios/${employeeRoleId}/editar`,
      },
    ],
    [employeeRoleId]
  );

  useEffect(() => {
    setLoading(true);
    getEmployeeRoleById.execute(employeeRoleId).then((response) => {
      setLoading(false);

      if (response.error) {
        setNotfound(true);
        setNotification({
          type: "error",
          title: "Error",
          message: "Algo ha salido mal, intentelo nuevamente",
        });

        return;
      }

      if (response.data) {
        setNotfound(false);
        setEmployeeRole(response.data);
      }
    });
  }, [setNotification, employeeRoleId]);

  return (
    <>
      <Nav title="Editar roles de funcionario" navItems={navItems} />
      <Container>
        {!loading && notFound ? (
          <RecordNotFound />
        ) : (
          <EmployeeRoleForm
            employeeRole={employeeRole}
            loading={loading}
            onSubmitData={handleOnSubmit}
          />
        )}
      </Container>
    </>
  );
};
