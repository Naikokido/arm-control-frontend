import { useMemo } from 'react';
import { RiHome4Line } from '@remixicon/react';
import LinkCard from '../components/ui/layout/LinkCard.tsx';
import Nav from '../components/ui/layout/Nav.tsx';
import { appHomeItems } from '../../../../routes/component-items/appHomeItems.ts';
import Container from '../components/ui/layout/Container.tsx';

export default function AppHomePage() {
  const navItems = useMemo(() => [{ title: 'Home', href: '', icon: RiHome4Line }], []);

  return (
    <>
      <Nav title="Sistema de Trazabilidad" navItems={navItems} />
      <Container>
        <div className="mx-auto lg:mx-0">
          <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">Accesos directos</p>
        </div>
        <div className="mx-auto gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-5 mt-5 lg:mx-0 lg:max-w-none">
          <LinkCard items={appHomeItems} />
        </div>
      </Container>
    </>
  );
}
