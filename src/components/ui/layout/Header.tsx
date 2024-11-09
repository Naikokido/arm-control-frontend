import type { FC } from 'react';
import { Fragment } from 'react';
import type { RemixiconComponentType } from '@remixicon/react';
import { RiAppsLine, RiArrowDownSLine, RiSearchLine, RiSidebarFoldLine } from '@remixicon/react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle.tsx';

export interface IApps {
  name: string;
  description: string;
  href: string;
  icon: RemixiconComponentType;
  hover: string;
  iconColor: string;
}

interface IHeaderProps {
  apps: IApps[];
  username?: string;
  onSidebarToggle: () => void;
}

const Header: FC<IHeaderProps> = ({ username = '', apps, onSidebarToggle }) => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="flex h-16 flex-shrink-0 lg:border-none">
      <button
        type="button"
        className="border-r border-white border-opacity-20 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
        onClick={onSidebarToggle}
      >
        <span className="sr-only">Abrir barra lateral</span>
        <RiSidebarFoldLine className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between gap-4 px-4 sm:px-6 lg:mx-auto lg:px-8 border-b border-white border-opacity-20">
        <div className="flex flex-1 items-center">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Buscar
            </label>
            <div className="relative w-full text-gray-400">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-1.5"
                aria-hidden="true"
              >
                <RiSearchLine className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block w-full bg-primary-700 dark:bg-gray-700 rounded-md border-transparent py-2 pl-8 pr-3 text-gray-100 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-0 text-sm"
                placeholder="Buscar en sistema de trazabilidad..."
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <Popover className="relative hidden lg:block">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm leading-6 text-gray-100 dark:text-gray-100">
              <RiAppsLine className="h-4 w-4" aria-hidden="true" />
              <span>Apps</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 sm:mt-5 sm:w-screen sm:max-w-md">
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-gray-900 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {apps.map(item => (
                      <div
                        key={item.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700">
                          <item.icon
                            className={`h-6 w-6 text-gray-600 dark:text-gray-400 ${item.hover}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <Link to={item.href} className="font-semibold text-gray-900 dark:text-gray-100">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600 dark:text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-transparent text-sm lg:rounded-md lg:p-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  alt=""
                />
                <span className="ml-3 hidden text-sm font-medium text-gray-100 lg:block">{username}</span>
                <RiArrowDownSLine className="ml-1 hidden h-4 w-4 text-gray-100 lg:block" aria-hidden="true" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/app/mi-perfil"
                      className={classNames(
                        active ? 'bg-gray-100 dark:bg-gray-800' : '',
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100',
                      )}
                    >
                      Mi perfil
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={classNames(
                        active ? 'bg-gray-100 dark:bg-gray-800' : '',
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100',
                      )}
                    >
                      Configuración
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/logout"
                      className={classNames(
                        active ? 'bg-gray-100 dark:bg-gray-800' : '',
                        'block px-4 py-2 text-sm text-red-500 dark:text-red-400',
                      )}
                    >
                      Cerrar sesión
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
