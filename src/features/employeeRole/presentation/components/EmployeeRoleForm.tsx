import type { FC } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Input, Switch } from '../../../_global';
import Row from '../../../_global/presentation/components/ui/layout/Row.tsx';
import Column from '../../../_global/presentation/components/ui/layout/Column.tsx';
import { RiSaveLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import type { EmployeeRoleEntity } from '../../domain';
import { createEmployeeRoleSchema, updateEmployeeRoleSchema } from '../../domain';

interface EmployeeRoleFormProps {
  employeeRole?: EmployeeRoleEntity | null;
  loading?: boolean;
  onSubmitData: (formData: FormData) => void;
}

export const EmployeeRoleForm: FC<EmployeeRoleFormProps> = ({ employeeRole, loading, onSubmitData }) => {
  const [form, fields] = useForm({
    shouldValidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: employeeRole?.id ? updateEmployeeRoleSchema : createEmployeeRoleSchema });
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
              id="name"
              label="Nombre"
              placeholder="Ingrese el nombre"
              name={fields.name.name}
              required
              error={fields.name.errors && fields.name.errors.length !== 0}
              errorMessages={fields.name.errors as string[]}
              disabled={loading}
              defaultValue={employeeRole?.name}
            />
          </Column>
        </Row>
      </>

      <Row>
        <Column>
          <Switch
            id="enabled"
            name={fields.enabled.name}
            label="Habilitado"
            error={fields.enabled.errors && fields.enabled.errors.length > 0}
            errorMessages={fields.enabled.errors as string[]}
            disabled={loading}
            defaultValue={employeeRole?.enabled}
          />
        </Column>
      </Row>

      <div className="flex justify-end mt-10">
        <div className="flex justify-end mr-5">
          <Link
            to="/app/roles-de-funcionarios"
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
