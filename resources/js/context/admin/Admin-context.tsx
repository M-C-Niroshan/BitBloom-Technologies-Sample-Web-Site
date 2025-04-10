import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    home: false,
    services: false,
    about: false,
    contact: false,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminContext.Provider value={{ openMenus, toggleMenu }}>
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
