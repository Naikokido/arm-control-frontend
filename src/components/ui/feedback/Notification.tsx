import { type FC } from 'react';
import { Transition } from '@headlessui/react';
import { RiCheckboxCircleFill, RiCloseCircleLine, RiCloseLine, RiErrorWarningLine } from '@remixicon/react';

export interface INotificationProps {
  type?: 'success' | 'warning' | 'error' | null;
  title?: string;
  message?: string;
  onCLoseNotification?: () => void;
}

const Notification: FC<INotificationProps> = ({ type = null, message = '', title = '', onCLoseNotification }) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {type === 'success' && (
                    <RiCheckboxCircleFill aria-hidden="true" className="h-6 w-6 text-green-400 dark:text-green-300" />
                  )}
                  {type === 'error' && (
                    <RiCloseCircleLine aria-hidden="true" className="h-6 w-6 text-red-600 dark:text-red-400" />
                  )}
                  {type === 'warning' && (
                    <RiErrorWarningLine aria-hidden="true" className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    onClick={onCLoseNotification}
                    className="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Cerrar</span>
                    <RiCloseLine aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Notification;
