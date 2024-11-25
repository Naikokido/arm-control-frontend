import { useNotification } from '../../../../core/contexts/NotificationContext.tsx';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { IColumnProps } from '../../../_global';
import { useFilters } from '../../../../core/hooks/useTableFilter.ts';
import type { UserEntity } from '../../domain';
import { RiAddLine, RiDeleteBinLine, RiHome4Line, RiSearchLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import Nav from '../../../_global/presentation/components/ui/layout/Nav.tsx';
import { Table } from '../../../_global';
import { deleteUserById ,getUsers } from './controller.ts';

interface IUserDataProps extends Pick<UserEntity, 'id' | 'fullname' | 'email' | 'role' | 'phone'>  {}

export const UserListPage: FC = () => {
  const { setNotification } = useNotification();
  const [dataResponse, setDataResponse] = useState<IUserDataProps[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const { params,onChangeSearch } = useFilters();

  const handleOnGetUsers = useCallback(() => {
    setLoadingData(true);
    getUsers.execute().then(response => {
      setLoadingData(false);
      // Asumiendo que la respuesta del servidor es directamente un arreglo de usuarios
      if (Array.isArray(response)) {  // Cambia aquí para verificar si la respuesta es un arreglo
        const formattedData = response.map(user => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          phone: user.phone,
        }));
        setDataResponse(formattedData);
      } else {
        console.log('Unexpected API response:', response);
        setNotification({
          type: "error",
          message: "Failed to fetch users, please try again.",
          title: "Fetch Error"
        });
      }
    }).catch(error => {
      setLoadingData(false);
      console.error('API call failed:', error);
      setNotification({
        type: "error",
        message: "Network error or bad response, please try again.",
        title: "API Error"
      });
    });
  }, [setNotification]);

  const handleOnDeleteUser = useCallback(
    (id: UserEntity['id']) => {
      setLoadingData(true);
      deleteUserById.execute(id).then(response => {
        setLoadingData(false);
        const titleNotification = 'Eliminación de usuario';
        if (response.error) {
          setNotification({
            type: 'error',
            title: titleNotification,
            message: 'Hubo un error, inténtelo nuevamente',
          });
          return;
        }
        setNotification({
          type: 'success',
          title: titleNotification,
          message: 'El usuario ha sido eliminado correctamente',
        });

        handleOnGetUsers();
      });
    },
    [handleOnGetUsers, setNotification],
  );

  const navItems = useMemo(
    () => [
      {
        title: 'Home',
        icon: RiHome4Line,
        href: '/home',
      },
      {
        title: 'Listar usuarios',
        href: '/user/list-users',
      },
    ],
    [],
  );

  const columns: IColumnProps<{
    id: string;
    fullname: string;
    email: string;
    role: string;
    phone: string;
  }>[] = useMemo(
    () => [
      {
        title: 'N°',
        key: 'current',
        render: (_, index) => index + 1,
        widthPercentage: 10,
      },
      {
        title: 'Name',
        key: 'fullname',
        render: item => (
          <Link
            to={`/user/list-users/${item.id}/editar`}
            className="font-semibold text-blue-800 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {item.fullname}
          </Link>
        ),
        widthPercentage: 30,
      },
      { title: 'Email', key: 'email', dataIndex: 'email', widthPercentage: 20 },
      { title: 'Phone', key: 'phone', dataIndex: 'phone', widthPercentage: 20 },

      {
        title: '',
        key: 'action',
        render: item => (
          <button
            onClick={() => handleOnDeleteUser(item.id)}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 dark:bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm
            hover:bg-red-500
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          >
            Eliminar
            <RiDeleteBinLine aria-hidden="true" className="-mr-0.5 h-5 w-5" />
          </button>
        ),
        widthPercentage: 10,
      },
    ],
    [handleOnDeleteUser],
  );

  useEffect(() => {
    handleOnGetUsers();
  }, [handleOnGetUsers]);

  return (
    <>
      <Nav title="User Management" navItems={navItems} />
      <div className="mx-auto lg:mx-0">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <RiSearchLine className="h-5 w-5 text-gray-400 dark:text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-96 rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 dark:bg-gray-700 sm:text-sm sm:leading-6"
              placeholder="Buscar..."
              onChange={onChangeSearch}
              defaultValue={params.search}
            />
          </div>
          <div className="flex justify-end">
            <Link
              to="crear"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm
            hover:bg-primary-500
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <RiAddLine aria-hidden="true" className="-mr-0.5 h-5 w-5" />
              New User
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-600 pt-5 mt-5 lg:mx-0 lg:max-w-none">
        <Table
          columns={columns}
          dataSource={dataResponse}
          loading={loadingData}
        />
      </div>
    </>
  );
};
