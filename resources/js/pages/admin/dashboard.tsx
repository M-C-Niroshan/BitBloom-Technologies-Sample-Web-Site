import AdminLayout from '@/layouts/admin/admin-layout';
import { useState } from 'react';
import Welcome from '@/pages/frontend/welcome';
import Services from '@/pages/frontend/services';
import About from '@/pages/frontend/about';
import Contact from '@/pages/frontend/contact';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('home'); // Default to no section

  return (
      <AdminLayout setActiveSection={setActiveSection} activeSection={activeSection}>
        <div className="">
          {activeSection === 'home' && <Welcome admin_mode={true} title={"BitBloom Technologies-Admin"} />}
          {activeSection === 'services' && <Services admin_mode={true} title={"BitBloom Technologies-Admin"} />}
          {activeSection === 'about' && <About admin_mode={true} title={"BitBloom Technologies-Admin"} />}
          {activeSection === 'contact' && <Contact admin_mode={true} title={"BitBloom Technologies-Admin"} />}
        </div>
      </AdminLayout>
  );
}
