import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  activetab: string;
  toggleTab: (tab: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    home: false,
    services: false,
    about: false,
    contact: false,
  });
  const [activetab, setActivetab] = useState('dashboard');

  const toggleTab = (tab: string) => {
    setActivetab(tab);
  }

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminContext.Provider value={{ openMenus, toggleMenu, activetab, toggleTab }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
