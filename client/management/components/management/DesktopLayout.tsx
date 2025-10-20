import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const contentBaseStyle: React.CSSProperties = {
  transition: 'margin-left 0.2s',
  marginTop: '0px',
  padding: '24px',
  minHeight: 'calc(100vh - 64px)',
  background: '#f6f8fa',
};

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f6f8fa',
        width: '100vw',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar column */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 300, width: sidebarOpen ? '220px' : '72px', minWidth: sidebarOpen ? '220px' : '72px', maxWidth: sidebarOpen ? '220px' : '72px' }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      {/* Main column: header + outlet */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        {/* Header row */}
        <div style={{ zIndex: 200, position: 'relative', width: '100%' }}>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        {/* Outlet row */}
        <div
          style={{
            ...contentBaseStyle,
            marginLeft: 0,
            minHeight: 'calc(100vh - 64px)',
            width: '100%',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
