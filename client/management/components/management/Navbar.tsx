import React from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import useAuthService from '@/services/authService';
import { useUIConfig } from '@/lib/ui-config';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const { headerIconSize, headerBg, iconColor, textColor } = useUIConfig();

  const { logout } = useAuthService();
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('redirectAfterLogin');
        }
        router.push('/login');
      }
    } catch (error) {
      // Hata global olarak yönetiliyor
    }
  };

  // Mobil algılama
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Masaüstü header
  if (!isMobile) {
    return (
      <div
        style={{
          width: '100%',
          height: 64,
          background: headerBg,
          color: textColor,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 24px',
          boxSizing: 'border-box',
          userSelect: 'none',
          zIndex: 200,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}
          >
            <FiMenu size={headerIconSize} style={{ color: iconColor, cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <button
            onClick={handleLogout}
            title="Çıkış Yap"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}
          >
            <FiLogOut size={headerIconSize} style={{ color: iconColor, cursor: 'pointer', justifySelf: 'end' }} onClick={handleLogout} />
          </button>
        </div>
      </div>
    );
  }

  // Mobil header (app bar)
  return (
    <div
      className="fixed top-0 left-0 w-full flex items-center justify-between bg-[#181C2A] z-[101] shadow-md md:hidden"
      style={{ height: 56, padding: '0 18px', color: '#fff' }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>MYY Software</span>
      </div>
      <button
        onClick={handleLogout}
        title="Çıkış Yap"
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.6rem', color: '#fff', display: 'flex', alignItems: 'center', position: 'absolute', right: 18, top: 0, height: 56 }}
      >
        <FiLogOut size={22} style={{ color: '#fff' }} />
      </button>
    </div>
  );
};

export default Navbar;
