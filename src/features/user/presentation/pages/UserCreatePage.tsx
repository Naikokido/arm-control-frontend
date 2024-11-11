import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { useNotification } from "../../../../core/contexts/NotificationContext.tsx";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { createUserSchema } from "../../domain";
import { RiHome4Line } from "@remixicon/react";
import Nav from "../../../_global/presentation/components/ui/layout/Nav.tsx";
import Container from "../../../_global/presentation/components/ui/layout/Container.tsx";
import { UserForm } from "../components";
import { createUser } from "./controller.ts";
import { ISelectOptions } from '../../../_global';

export const UserCreatePage: FC = () => {
  const { setNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const roleOptions: ISelectOptions[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  const handleOnSubmit = useCallback(
    (formData: FormData) => {
      setLoading(true);
      type UserKeys = keyof z.infer<typeof createUserSchema>;
      const formFields = createUserSchema.keyof().options;
      const formValues = Object.fromEntries(
        formFields.map((field) => [field, formData.get(field) as string])
      ) as Record<UserKeys, string>;

      createUser
        .execute({
          fullname: formValues.fullname,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
          phone: formValues.phone,
        })

        .then((response) => {
          setLoading(false);
          const notificationTitle = "Create new User";

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
              message: "new user created with success",
            });

            navigate("/user/list-users");

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
        href: "/home",
      },
      {
        title: 'Listar usuarios',
        href: '/user/list-users',
      },
      {
        title: "Crear",
        href: "/user/list-users/crear",
      },
    ],
    []
  );

  return (
    <>
      <Nav title="Create new User" navItems={navItems} />
      <Container>
        <UserForm roleOptions={roleOptions} loading={loading} onSubmitData={handleOnSubmit} />
      </Container>
    </>
  );
};
