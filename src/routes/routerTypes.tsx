import type { ReactNode } from 'react';

//Tipado para las rutas
export interface routerType {
  title: string;
  path: string;
  element: ReactNode;
  children?: routerType[];
}
