import React, { createContext, useState, type ReactNode, useContext } from 'react';
import { formatRut } from '../../helpers/formatRut.ts';

interface IUserData {
  id: string;
  name: string;
}

interface UserContextType {
  userData: IUserData | null;
  setUserData: (userData: IUserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  return (
    <UserContext.Provider
      value={{ userData: userData ? { ...userData, name: formatRut(userData.name) } : null, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
