import type { FC } from 'react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import type { RemixiconComponentType } from '@remixicon/react';

export interface ILinkCardItemProps {
  key: string;
  icon: RemixiconComponentType;
  iconColor: string; // -700
  iconBackgroundColor: string; // -50
  href: string;
  title: string;
  description: string;
}

interface ILinkCardProps {
  items: ILinkCardItemProps[];
}

const LinkCard: FC<ILinkCardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <div
          key={item.key}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-700 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-700 hover:border-primary-400 dark:hover:border-primary-500"
        >
          <div>
            <span
              className={`${item.iconColor} ${item.iconBackgroundColor} inline-flex rounded-lg p-3 ring-4 ring-white dark:ring-gray-800`}
            >
              {createElement(item.icon, {
                className: 'h-6 w-6',
                'aria-hidden': 'true',
              })}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <Link to={item.href} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkCard;
