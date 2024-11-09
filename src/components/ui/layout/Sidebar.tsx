import { createElement, useState } from 'react';
import type { FC } from 'react';
import type { RemixiconComponentType } from '@remixicon/react';
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiCircleFill, RiCloseLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { IApps } from './Header.tsx';

export interface ISidebarItem {
  key: string;
  title: string;
  href: string;
  icon: RemixiconComponentType;
  iconColor: string;
  current?: boolean | null;
  children?: ISidebarItem[];
}

interface ISidebarProps {
  items: ISidebarItem[];
  title: string;
  isOpen: boolean;
  apps?: IApps[] | null;
  toggleSidebar: () => void;
}

const Sidebar: FC<ISidebarProps> = ({ items, title, isOpen, toggleSidebar, apps }) => {
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

  const toggleAppsOpen = () => setIsAppsOpen(!isAppsOpen);

  return (
    <>
      <div
        className={classNames(
          'fixed inset-y-0 z-40 w-64 flex flex-col bg-primary-gradient-start transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:flex',
        )}
      >
        <div className="flex flex-shrink-0 items-center px-4 h-16">
          <img
            className="h-8 mr-4 w-auto"
            src="https://res.cloudinary.com/djpir2ory/image/upload/v1689080700/SF_MUNICIPALIDAD_BLANCO_iupyi1.png"
            alt="logo"
          />
          <p className="text-white dark:text-gray-100 text-sm font-medium leading-6">{title}</p>
          <button
            type="button"
            className="border-opacity-20 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Cerrar sidebar</span>
            <RiCloseLine className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-grow bg-white dark:bg-gray-900 flex-col overflow-y-auto rounded-tr-2xl">
          <nav className="mt-5 flex flex-1 flex-col overflow-y-auto" aria-label="Sidebar">
            <div className="space-y-1 px-2">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {items.map(item => (
                  <li key={item.key}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-primary-800 text-white dark:text-gray-100'
                            : 'text-gray-800 dark:text-gray-300 hover:bg-gray-800 hover:text-gray-400',
                          'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6',
                        )}
                      >
                        {createElement(item.icon, {
                          className: classNames(
                            item.current ? 'text-white' : item.iconColor,
                            'mr-4 h-6 w-6 flex-shrink-0',
                          ),
                          'aria-hidden': 'true',
                        })}
                        {item.title}
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        <DisclosureButton
                          className={classNames(
                            item.current ? 'bg-gray-50' : 'hover:bg-gray-800 hover:text-gray-100',
                            'group flex w-full items-center rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100',
                          )}
                        >
                          {createElement(item.icon, {
                            className: classNames(
                              item.current ? 'text-white' : item.iconColor,
                              'mr-4 h-6 w-6 flex-shrink-0',
                            ),
                            'aria-hidden': 'true',
                          })}
                          {item.title}
                          <RiArrowRightSLine
                            aria-hidden="true"
                            className="ml-auto h-5 w-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                          />
                        </DisclosureButton>
                        <DisclosurePanel as="ul" className="mt-1 px-2">
                          {item.children.map(subItem => (
                            <li key={subItem.key}>
                              <Link
                                to={subItem.href}
                                className={classNames(
                                  'text-gray-800 dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-gray-100',
                                  'group flex items-center rounded-md pl-10 pr-2 py-2 text-sm font-medium leading-6',
                                )}
                              >
                                {createElement(RiCircleFill, {
                                  className: classNames(
                                    'text-gray-800 dark:text-gray-200',
                                    'group-hover:text-gray-100 dark:group-hover:text-gray-200',
                                    'mr-4 h-1.5 w-1.5 flex-shrink-0',
                                  ),
                                  'aria-hidden': 'true',
                                })}
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col bg-white dark:bg-gray-900 border-gray-200 border-b border-gray-900/10 lg:hidden">
          <button
            onClick={toggleAppsOpen}
            className="flex justify-between items-center text-md font-semibold leading-6 text-gray-800 dark:text-gray-100 p-4 w-full hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex-1 text-center">Aplicaciones</div>
            {isAppsOpen ? <RiArrowDownSLine className="w-5 h-5" /> : <RiArrowLeftSLine className="w-5 h-5" />}
          </button>

          {isAppsOpen && (
            <div className="px-2 py-4">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {apps?.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-gray-100 dark:hover:text-gray-100"
                    >
                      <div className="flex h-6 w-8 flex-none items-center justify-center rounded-full">
                        <item.icon className={`h-5 w-5 ${item.iconColor}`} aria-hidden="true" />
                      </div>
                      <div className="ml-4">{item.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
