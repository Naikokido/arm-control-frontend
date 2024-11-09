import { type DetailedHTMLProps, type FC, type InputHTMLAttributes } from 'react';
import { RiErrorWarningFill } from '@remixicon/react';

interface IInputDateProps
  extends Partial<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'required'>> {
  id: string;
  label?: string;
  error?: boolean;
  errorMessages?: string[];
  required?: boolean;
}

const InputDate: FC<IInputDateProps> = ({ id, label, error, errorMessages, required, ...leftProps }) => {
  // FIXME: height
  return (
    <div className="pb-3" style={{ height: 88 }}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white" htmlFor={id}>
          {required && <span className="text-red-600 dark:text-red-400">* </span>}
          {`${label}:`}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id={id}
          {...leftProps}
          className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
            error ? 'ring-red-300 dark:ring-red-400' : 'ring-gray-300 dark:ring-gray-500'
          } placeholder:text-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset ${
            error ? 'focus:ring-red-600 dark:focus:ring-red-500' : 'focus:ring-primary-600 dark:focus:ring-primary-200'
          } sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
          type="date"
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <RiErrorWarningFill aria-hidden="true" className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
        )}
      </div>
      <p className="mt-0 text-sm text-red-600 dark:text-red-400">
        {error && errorMessages && errorMessages.length > 0 ? errorMessages[0] : null}
      </p>
    </div>
  );
};

export { InputDate };
export type { IInputDateProps };
