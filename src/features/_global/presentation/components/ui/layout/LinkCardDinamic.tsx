import type { FC, Key, ReactNode } from 'react';
import type { RemixiconComponentType } from '@remixicon/react';
import { RiArrowLeftLine, RiArrowRightLine, RiFolderOpenLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

export interface ILinkCardDinamicItemProps<T = never> {
  icon?: RemixiconComponentType | null;
  iconColor?: string | null;
  iconBackgroundColor?: string | null;
  width?: number;
  title?: ReactNode;
  href?: string | null;
  description?: ReactNode | null;
  key?: Key;
  dataIndex?: string | null;
  render?: (record: T, index: number) => ReactNode | ReactNode[] | null;
}

interface ILinkCardDinamicProps {
  items: ILinkCardDinamicItemProps[];
  dataSource: Record<string, ReactNode>[];
  total?: number;
  loading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
    pageLimit: number;
    onChangePageLimit: (limit: number) => void;
  };
}

const LinkCardDinamic: FC<ILinkCardDinamicProps> = ({ items, dataSource, pagination, total = 0, loading = false }) => {
  return (
    <>
      {dataSource.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 shadow-sm hover:shadow-md"
            >
              <Link to={item.href || ''} className="focus:outline-none">
                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-800">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity="0.25"
                    />
                    <path
                      fill="currentColor"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            )}
            {dataSource.length === 0 ? (
              <div className="even:bg-gray-50 dark:even:bg-gray-700 h-64 flex flex-col justify-center items-center">
                <RiFolderOpenLine className="h-10 w-10 text-gray-900 dark:text-gray-100" />
                <div className="mt-2 text-sm text-gray-600 text-center dark:text-gray-400">No hay datos</div>
              </div>
            ) : (
              dataSource.map((data, index) => (
                <div key={index} className="even:bg-gray-50 dark:even:bg-gray-700 flex">
                  {items.map(col => (
                    <div
                      key={col.key}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 flex-1 text-center"
                    >
                      {col.dataIndex
                        ? data[col.dataIndex]
                        : col.render && pagination
                          ? col.render(data as never, index + (pagination.currentPage - 1) * pagination.pageLimit)
                          : col.render
                            ? col.render(data as never, index)
                            : ''}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="mx-auto gap-x-8 gap-y-16 pt-5 lg:mx-0 lg:max-w-none">
        {dataSource.length !== 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
            {pagination && (
              <div className="flex flex-1 justify-start sm:hidden">
                <button
                  onClick={() => pagination?.onChangePage(pagination?.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="relative disabled:cursor-not-allowed inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Anterior
                </button>
                <button
                  onClick={() => pagination?.onChangePage(pagination?.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="relative disabled:cursor-not-allowed ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Siguiente
                </button>
                <div className="flex justify-end items-center gap-2">
                  <select
                    className="block rounded-md ml-2 shadow-sm w-26 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:focus:ring-primary-500"
                    defaultValue={pagination.pageLimit}
                    onChange={event => pagination?.onChangePageLimit(Number(event.target.value))}
                  >
                    <option value="10">10 / página</option>
                    <option value="25">25 / página</option>
                    <option value="50">50 / página</option>
                    <option value="100">100 / página</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm ml-4 flex items-center justify-center text-center text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Página {pagination.currentPage}</span>
                  </p>
                </div>
              </div>
            )}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-4">
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  {pagination && (
                    <>
                      <button
                        onClick={() => pagination?.onChangePage(pagination?.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="relative disabled:cursor-not-allowed inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Anterior</span>
                        <RiArrowLeftLine className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {Array.from({ length: pagination.totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => pagination?.onChangePage(index + 1)}
                          className={`relative ${
                            pagination.currentPage === index + 1
                              ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700'
                          } inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => pagination?.onChangePage(pagination?.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="relative disabled:cursor-not-allowed inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Siguiente</span>
                        <RiArrowRightLine className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div className="flex justify-end items-center gap-2">
                        <select
                          className="block rounded-md ml-4 shadow-sm w-26 border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:focus:ring-primary-500"
                          defaultValue={pagination.pageLimit}
                          onChange={event => pagination?.onChangePageLimit(Number(event.target.value))}
                        >
                          <option value="10">10 / página</option>
                          <option value="25">25 / página</option>
                          <option value="50">50 / página</option>
                          <option value="100">100 / página</option>
                        </select>
                      </div>
                    </>
                  )}
                </nav>
              </div>
              <div>
                {total && pagination ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando desde el{' '}
                    <span className="font-medium">{(pagination.currentPage - 1) * pagination.pageLimit + 1}</span> al{' '}
                    <span className="font-medium">
                      {Math.min(pagination.currentPage * pagination.pageLimit, total)}
                    </span>{' '}
                    de <span className="font-medium">{total}</span> resultados
                  </p>
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando <span className="font-medium">{dataSource.length}</span> resultados
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LinkCardDinamic;
