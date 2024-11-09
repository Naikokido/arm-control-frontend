import type { ReactNode } from 'react';
import type { ISidebarItem } from './Sidebar.tsx';
import Sidebar from './Sidebar.tsx';
import type { IApps } from './Header.tsx';
import Header from './Header.tsx';
import { useState } from 'react';

interface ILayoutProps {
  sidebarItems: ISidebarItem[];
  apps: IApps[];
  username?: string;
  children: ReactNode;
}

const Layout = ({ sidebarItems, username = '', apps, children }: ILayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      <div className="min-h-full bg-primary-50 dark:bg-slate-700">
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          title="SISTEMA DE TRAZABILIDAD"
          apps={apps}
        />
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end dark:from-primary-900 dark:to-primary-900 bg-test pb-56 lg:rounded-bl-2xl">
            <Header username={username} apps={apps} onSidebarToggle={toggleSidebar} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
