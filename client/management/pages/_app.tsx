import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import ToastProvider from '../lib/ToastProvider';
import { AuthProvider, useAuthContext } from '../lib/AuthProvider';
import useAuthService from '../services/authService';
import toast from 'react-hot-toast';


import Layout from "../components/management/Layout";
import LoadingScreen from "@/components/ui/LoadingScreen";




function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const { refreshToken } = useAuthService();
  const [checked, setChecked] = React.useState(false);

  // Sadece login sayfası hariç tüm sayfalarda route guard uygula
  const isLogin = router.pathname === "/login";

  React.useEffect(() => {
    if (isLogin) return;
    if (!accessToken) {
      if (typeof window !== 'undefined' && router.pathname !== '/login') {
        localStorage.setItem('redirectAfterLogin', router.asPath);
      }
      refreshToken().then((res) => {
        if (
          res?.data &&
          res.data.accessToken === null &&
          res.data.refreshToken === null &&
          res.data.refreshTokenExpiryTime === null &&
          res.data.username === null
        ) {
          router.replace("/login");
          return;
        }
        if (!res?.success) {
          toast.error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
          router.replace("/login");
        } else {
          setChecked(true);
        }
      }).catch(() => {
        router.replace("/login");
      });
    } else {
      setChecked(true);
    }
  }, [accessToken, router.pathname, isLogin]);

  // Login sayfası ise layout olmadan göster
  if (isLogin) {
    return <ToastProvider><Component {...pageProps} /></ToastProvider>;
  }

  // accessToken kontrolü sırasında LoadingScreen göster
  if (!accessToken && !checked) {
    return <LoadingScreen />;
  }
  // accessToken yoksa ve kontrol tamamlandıysa login'e yönlendirildi demektir
  if (!accessToken && checked) {
    return null;
  }

  // Tüm uygulama için ManagementLayout kullan
  return (
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}


export default function App(props: AppProps) {
  // React Query ve AuthProvider tüm uygulamayı sarmalar
  const queryClient = React.useRef(new QueryClient()).current;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
