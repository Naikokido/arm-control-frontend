import { type FC, useEffect, useState } from 'react';
import { RiErrorWarningFill } from '@remixicon/react';
import { Switch as SwitchHead } from '@headlessui/react';

interface IInputProps {
  id: string;
  label?: string;
  error?: boolean;
  errorMessages?: string[];
  required?: boolean;
  name?: string;
  defaultValue?: boolean | null;
  disabled?: boolean;
}

const Switch: FC<IInputProps> = ({ id, label, error, errorMessages, required, name, defaultValue, disabled }) => {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setEnabled(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="pb-3" style={{ height: 88 }}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white" htmlFor={id}>
          {required && <span className="text-red-600 dark:text-red-400">* </span>}
          {`${label}:`}
        </label>
      )}
      <div className="relative mt-2 rounded-md">
        <SwitchHead
          name={name}
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          disabled={disabled}
          className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out 
            bg-gray-200 dark:bg-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 
            focus:ring-offset-2 dark:focus:ring-offset-gray-900 
            data-[checked]:bg-primary-600 dark:data-[checked]:bg-primary-500`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-300 shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </SwitchHead>
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

export { Switch };
export type { IInputProps };
