import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  // Mobilde header üstte, içerik ortada, bottom nav altta
  return (
    <div style={{ minHeight: '100vh', background: '#fff', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Navbar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div style={{ flex: 1, width: '100%', paddingTop: 56, paddingBottom: 56, boxSizing: 'border-box', overflowY: 'auto' }}>
        {children}
      </div>
      <Sidebar open={false} setOpen={() => {}} />
    </div>
  );
}
