import { type DetailedHTMLProps, type FC, type InputHTMLAttributes, useCallback, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

interface IInputPasswordProps
  extends Partial<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'required'>> {
  id: string;
  label?: string;
  error?: boolean;
  errorMessages?: string[];
  required?: boolean;
}

const InputPassword: FC<IInputPasswordProps> = ({ id, label, error, errorMessages, required, ...leftProps }) => {
  const [viewPass, setViewPass] = useState<boolean>(false);

  const handleOnChangeViewPass = useCallback(() => setViewPass(!viewPass), [viewPass]);

  // FIXME: height
  return (
    <div className="pb-3" style={{ height: 88 }}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white" htmlFor={id}>
          {required && <span className="text-red-600 dark:text-red-400">* </span>}
          {`${label}:`}
        </label>
      )}
      <div className="relative">
        <div className="relative mt-2 flex items-center">
          <input
            id={id}
            {...leftProps}
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
              error ? 'ring-red-300 dark:ring-red-400' : 'ring-gray-300 dark:ring-gray-500'
            } placeholder:text-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset ${
              error ? 'focus:ring-red-600 dark:focus:ring-red-500' : 'focus:ring-primary-600 dark:focus:ring-blue-500'
            } sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
            type={!viewPass ? 'password' : 'text'}
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 items-center pr-3">
            {!viewPass ? (
              <RiEyeLine
                aria-hidden="true"
                className="h-5 w-5 text-gray-400 dark:text-gray-300 cursor-pointer"
                onClick={handleOnChangeViewPass}
              />
            ) : (
              <RiEyeOffLine
                aria-hidden="true"
                className="h-5 w-5 text-gray-400 dark:text-gray-300 cursor-pointer"
                onClick={handleOnChangeViewPass}
              />
            )}
          </div>
        </div>
        <p className="mt-0 text-sm text-red-600 dark:text-red-400">
          {error && errorMessages && errorMessages.length > 0 ? errorMessages[0] : null}
        </p>
      </div>
    </div>
  );
};

export { InputPassword };
export type { IInputPasswordProps };
