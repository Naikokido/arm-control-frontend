import { Link } from 'react-router-dom';
import type { FC } from 'react';

const RecordNotFound: FC = () => {
  return (
    <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Registro no encontrado
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        No pudimos encontrar el registro que buscas.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/app/home"
          className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          ← Volver al home
        </Link>
      </div>
    </div>
  );
};

export default RecordNotFound;
