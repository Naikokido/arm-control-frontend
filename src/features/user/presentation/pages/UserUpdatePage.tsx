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

  const roleOptions: ISelectOptions[] = useMemo(() =>  [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ], []);

  const handleOnSubmit = useCallback(
    (formData: FormData) => {
      setLoading(true);
      type UserKeys = keyof z.infer<typeof updateUserSchema>;
      const formFields = updateUserSchema.keyof().options;
      const formValues = Object.fromEntries(
        formFields.map((field) => [field, formData.get(field) as string])
      ) as Record<UserKeys, string>;
      updateUser.execute({
        id: UserId,
        fullname: formValues.fullname,
        email: formValues.email,
        password: formValues.password,
        role: formValues.role,
        phone: formValues.phone,
      })
        .then((response) => {
          setLoading(false);
          console.log('API response:', response);

          // Cambio aquí: verifica directamente la presencia de un mensaje exitoso en lugar de `user_id`
          if (!response.error && response) {
            setNotification({
              title: "Update User",
              type: "success",
              message: "User updated successfully!",
            });
            navigate("/user/list-users");
            return;
          }

          if (response.error) {
            setNotification({
              type: "error",
              message: response.error.message || 'Something went wrong',
              title: "Update User",
            });
            return;
          }

          // Mensaje por defecto si la respuesta no es la esperada
          console.log('Unexpected API response:', response);
          setNotification({
            type: "error",
            message: "Failed to update user, please check the data and try again.",
            title: "Update User",
          });
        })
        .catch(error => {
          setLoading(false);
          console.error('API call failed:', error);
          setNotification({
            type: "error",
            message: "Network error or bad response, please try again.",
            title: "API Error",
          });
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

  const fetchUserData = useCallback(() => {
    if (!UserId) {
      console.log("No UserId provided, skipping fetch.");
      return;
    }
    setLoading(true);
    getUserById.execute(UserId).then((response) => {
      setLoading(false);

      if (response && response.id) {
        console.log("User data received:", response);
        setNotfound(false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setUser(response);
      } else {
        console.log("Unexpected API response:", response);
        setNotfound(true);
        setNotification({
          type: "error",
          title: "Error",
          message: "No se pudo recuperar la información del usuario.",
        });
      }
    })
  }, [UserId, setNotification]);

  useEffect(() => {
    if (UserId) {
      fetchUserData();
    }
  }, [UserId]);


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
