import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';
import SupplierTable from '../components/management/SupplierTable';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Suppliers() {
  const router = useRouter();
  // Veri SupplierTable'da React Query ile çekilecek

  return (
    <>
      <Head>
        <title>Tedarikçiler</title>
      </Head>
      <div>
        <Card
          style={(() => {
            if (typeof window !== "undefined" && window.innerWidth <= 768) {
              return {
                maxWidth: "100vw",
                marginTop: 16,
                background: "#fff",
                borderRadius: 0,
                boxShadow: "none",
                padding: "16px",
                border: "none",
              };
            }
            return {
              margin: "0px 0 0 16px",
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              padding: "40px 32px",
              border: "1px solid #e3e8f0",
            };
          })()}
        >
          <CardHeader>
            <CardTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? 0 : 24,
                }}
              >
                <span
                  className="text-2xl font-bold text-primary"
                  style={{ marginBottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? 0 : 24, fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? 20 : undefined }}
                >
                  Tedarikçi Listesi
                </span>
                <Button
                  variant="default"
                  size={typeof window !== 'undefined' && window.innerWidth <= 768 ? "icon" : "lg"}
                  style={typeof window !== 'undefined' && window.innerWidth <= 768 ? { borderRadius: 8, width: 40, height: 40, padding: 0, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}
                  onClick={() => router.push('/suppliers/add')}
                >
                  {typeof window !== 'undefined' && window.innerWidth <= 768 ? '+' : 'Tedarikçi Ekle'}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SupplierTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
