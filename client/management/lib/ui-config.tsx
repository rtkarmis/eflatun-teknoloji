// UI context for global style values
import React, { createContext, useContext } from 'react';

export type UIConfig = {
  iconSize: number; // eski, backward compatibility
  sidebarIconSize: number;
  headerIconSize: number;
  sidebarBg: string;
  headerBg: string;
  iconColor: string;
  textColor: string;
  loginBg: string;
};

const defaultConfig: UIConfig = {
  iconSize: 20,
  sidebarIconSize: 20,
  headerIconSize: 24,
  sidebarBg: '#1a2332',
  headerBg: '#1a2332',
  iconColor: 'white',
  textColor: 'white',
  loginBg: '#1a2332',
};

const UIContext = createContext<UIConfig>(defaultConfig);

export const UIProvider = ({ children, config }: { children: React.ReactNode; config?: Partial<UIConfig> }) => {
  const mergedConfig = { ...defaultConfig, ...config };
  return <UIContext.Provider value={mergedConfig}>{children}</UIContext.Provider>;
};

export const useUIConfig = () => useContext(UIContext);
