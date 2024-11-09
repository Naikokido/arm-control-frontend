import { type FC, type ReactNode } from 'react';
interface IRowProps {
  spacingX?:
    | 'sm:gap-x-1'
    | 'sm:gap-x-2'
    | 'sm:gap-x-3'
    | 'sm:gap-x-4'
    | 'sm:gap-x-5'
    | 'sm:gap-x-6'
    | 'sm:gap-x-7'
    | 'sm:gap-x-8';
  children: ReactNode;
}

const Row: FC<IRowProps> = ({ spacingX = '', children }) => {
  return <div className={`grid grid-cols-1 sm:grid-cols-12 ${spacingX} gap-y-4`}>{children}</div>;
};

export default Row;
