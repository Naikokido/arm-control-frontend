import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../../core/contexts/NotificationContext.tsx";
import type { UserEntity } from "../../domain";
import { updateUserSchema } from "../../domain";
import type { z } from "zod";
import { RiHome4Line } from "@remixicon/react";
import Nav from "../../../_global/presentation/components/ui/layout/Nav.tsx";
import Container from "../../../_global/presentation/components/ui/layout/Container.tsx";
import RecordNotFound from "../../../_global/presentation/components/ui/layout/RecordNotFound.tsx";
import { UserForm } from "../components";
import { getUserById, updateUser } from "./controller.ts";
import { ISelectOptions } from '../../../_global';

export const UserUpdatePage: FC = () => {
  const { UserId = "" } = useParams();
  const { setNotification } = useNotification();
  const [user, setUser] = useState<UserEntity | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotfound] = useState<boolean>(false);
  const navigate = useNavigate();

  const roleOptions: ISelectOptions[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  const handleOnSubmit = useCallback(
    (formData: FormData) => {
      setLoading(true);
      type UserKeys = keyof z.infer<typeof updateUserSchema>;
      const formFields = updateUserSchema.keyof().options;
      const formValues = Object.fromEntries(
        formFields.map((field) => [field, formData.get(field) as string])
      ) as Record<UserKeys, string>;
      updateUser
        .execute({
          id: UserId,
          fullname: formValues.fullname,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
          phone: formValues.phone,
        })
        .then((response) => {
          setLoading(false);
          const notificationTitle = "Edit User";

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
              message: "new user edited with success",
            });

            navigate("/user/list-users");

            return;
          }
        });
    },
    [UserId, navigate, setNotification]
  );

  const navItems = useMemo(
    () => [
      {
        title: "Home",
        icon: RiHome4Line,
        href: "/app/home",
      },
      {
        title: 'Listar usuarios',
        href: '/user/list-users',
      },
      {
        title: "Editar",
        href: `/user/list-users/${UserId}/editar`,
      },
    ],
    [UserId]
  );

  useEffect(() => {
    setLoading(true);
    getUserById.execute(UserId).then((response) => {
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
        setUser(response.data);
      }
    });
  }, [setNotification, UserId]);

  return (
    <>
      <Nav title="Edit Users" navItems={navItems} />
      <Container>
        {!loading && notFound ? (
          <RecordNotFound />
        ) : (
          <UserForm
            user={user}
            roleOptions={roleOptions}
            loading={loading}
            onSubmitData={handleOnSubmit}
          />
        )}
      </Container>
    </>
  );
};
