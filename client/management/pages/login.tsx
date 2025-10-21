import Head from 'next/head';
import React from 'react';
import { useUIConfig } from '../lib/ui-config';
import LoginForm from '../components/management/LoginForm';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';


export default function Login() {
  const { loginBg } = useUIConfig();

  return (
    <>
      <Head>
        <title>Giriş Yap</title>
      </Head>
      <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: loginBg,
    }}>
      <Card style={{ maxWidth: '400px', width: '100%', background: '#fff', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', padding: '40px 32px', border: '1px solid #e3e8f0' }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary mb-6">Giriş Yap</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      </div>
    </>
  );
}
