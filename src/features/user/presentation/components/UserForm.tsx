import type { FC } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Input, InputPassword, ISelectOptions, Select } from '../../../_global';
import Row from '../../../_global/presentation/components/ui/layout/Row.tsx';
import Column from '../../../_global/presentation/components/ui/layout/Column.tsx';
import { RiSaveLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import type { UserEntity } from '../../domain';
import { createUserSchema, updateUserSchema } from '../../domain';

interface UserFormProps {
  user?: UserEntity | null;
  roleOptions: ISelectOptions[];
  loading?: boolean;
  onSubmitData: (formData: FormData) => void;
}

export const UserForm: FC<UserFormProps> = ({ user,roleOptions, loading, onSubmitData }) => {
  const [form, fields] = useForm({
    shouldValidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: user?.id ? updateUserSchema : createUserSchema });
    },
    onSubmit: (event, { formData }) => {
      event.preventDefault();
      onSubmitData(formData);
    },
  });

  return (
    <form method="post" id={form.id} onSubmit={form.onSubmit}>
      <>
        <Row>
          <Column colSpan="col-span-6">
            <Input
              id="fullname"
              label="Fullname"
              placeholder="enter your fullname"
              name={fields.fullname.name}
              required
              error={fields.fullname.errors && fields.fullname.errors.length !== 0}
              errorMessages={fields.fullname.errors as string[]}
              disabled={loading}
              defaultValue={user?.fullname}
            />
          </Column>
        </Row>
      </>

      <Row>
        <Column colSpan="col-span-6">
          <Input
            id="email"
            label="Email"
            placeholder="enter your email"
            name={fields.email.name}
            required
            error={fields.email.errors && fields.email.errors.length !== 0}
            errorMessages={fields.email.errors as string[]}
            disabled={loading}
            defaultValue={user?.email}
          />
        </Column>
      </Row>

      <Row>
        <Column colSpan="col-span-6">
          <Input
            id="phone"
            label="Phone/Cell-Phone"
            placeholder="Enter your phone"
            name={fields.phone.name}
            error={fields.phone.errors && fields.phone.errors.length !== 0}
            errorMessages={fields.phone.errors as string[]}
            disabled={loading}
            defaultValue={user?.phone || ''}
          />
        </Column>
      </Row>

      <Row>
        <Column colSpan="col-span-6">
          <Select
            id="role"
            label="Role"
            options={roleOptions}
            name={fields.role.name}
            error={fields.role.errors && fields.role.errors.length !== 0}
            errorMessages={fields.role.errors as string[]}
            disabled={loading}
            defaultValue={user?.role}
          />
        </Column>
      </Row>

      <Row>
        <Column colSpan="col-span-6">
          <InputPassword
            id="password"
            name={fields.password.name}
            placeholder="Enter your password..."
            label="Password"
            required
            error={fields.password.errors && fields.password.errors.length > 0}
            errorMessages={fields.password.errors as string[]}
            autoComplete="off"
            disabled={loading}
          />
        </Column>
      </Row>


      <div className="flex justify-end mt-10">
        <div className="flex justify-end mr-5">
          <Link
            to='/user/list-users'
            className="inline-flex items-center gap-x-1.5 rounded-md  px-2.5 py-1.5 text-sm font-semibold text-white
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
              Cancelar
            </button>
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex justify-center items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
            loading
              ? 'disabled:cursor-not-allowed disabled:bg-primary-400 disabled:text-white-500 disabled:ring-primary-200'
              : ''
          }`}
        >
          {!loading ? (
            <RiSaveLine aria-hidden="true" className="-mr-0.5 h-5 w-5" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-white animate-spin" />
          )}
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};
