import { Outlet } from 'react-router-dom';
import Sidebar from './Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#08080F' }}>
      <Sidebar />

      {/* Main scrollable content */}
      <main className="flex-1 ml-56 overflow-y-auto">
        <div className="min-h-full p-6 lg:p-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
