import type { FC } from 'react';
import { createElement, Fragment } from 'react';
import type { RemixiconComponentType } from '@remixicon/react';
import { RiArrowRightSLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

interface IBreadcrumbItemProps {
  icon?: RemixiconComponentType;
  title: string;
  href?: string;
}

interface IBreadcrumbProps {
  title: string;
  breadcrumbItems?: IBreadcrumbItemProps[];
}

const Breadcrumb: FC<IBreadcrumbProps> = ({ title, breadcrumbItems }) => {
  return (
    <nav style={{ marginTop: '-188px' }} className="pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center" aria-label="Breadcrumb">
          {breadcrumbItems && (
            <ol className="flex flex-wrap items-center space-x-2">
              {breadcrumbItems.map((item, index) => {
                if (index === 0) {
                  return (
                    <li key={index}>
                      <div className="flex text-gray-100 hover:text-gray-300 items-center gap-x-2">
                        {item.icon &&
                          createElement(item.icon, {
                            className: 'h-4 w-4 flex-shrink-0',
                            'aria-hidden': 'true',
                          })}
                        <Link to={item.href || ''} className="text-sm sm:text-base font-medium">
                          {item.title}
                        </Link>
                      </div>
                    </li>
                  );
                }

                return (
                  <Fragment key={index}>
                    <li>
                      <RiArrowRightSLine className="h-4 w-4 flex-shrink-0 text-gray-100" aria-hidden="true" />
                    </li>
                    <li>
                      <div className="flex items-center gap-x-2 text-gray-100 hover:text-gray-300">
                        {item.icon &&
                          createElement(item.icon, {
                            className: 'h-4 w-4 flex-shrink-0',
                            'aria-hidden': 'true',
                          })}
                        <Link
                          to={item.href || ''}
                          className="text-sm sm:text-base font-medium text-gray-100 dark:text-gray-300"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ol>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="grid gap-4 lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold leading-7 text-white dark:text-gray-100 sm:truncate sm:tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
