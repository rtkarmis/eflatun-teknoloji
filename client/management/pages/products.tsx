import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import ProductTable from '../components/management/ProductTable';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Products() {
  // Veri ProductTable'da React Query ile çekilecek

  return (
    <>
      <Head>
        <title>Ürünler</title>
      </Head>
      <div>
        <Card
          style={(() => {
            if (typeof window !== "undefined" && window.innerWidth <= 768) {
              return {
                maxWidth: "100vw",
                marginTop: 16 ,
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
                  marginBottom: typeof window !== "undefined" && window.innerWidth <= 768 ? 0 : 24,
                }}
              >
                <span
                  className="text-2xl font-bold text-primary"
                  style={{ marginBottom: typeof window !== "undefined" && window.innerWidth <= 768 ? 0 : 24, fontSize: typeof window !== "undefined" && window.innerWidth <= 768 ? 20 : undefined }}
                >
                  Ürün Listesi
                </span>
                <Link href="/products/add">
                  <Button
                    variant="default"
                    size={typeof window !== "undefined" && window.innerWidth <= 768 ? "icon" : "lg"}
                    style={typeof window !== "undefined" && window.innerWidth <= 768 ? { borderRadius: 8, width: 40, height: 40, padding: 0, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}
                  >
                    {typeof window !== "undefined" && window.innerWidth <= 768 ? '+' : 'Ürün Ekle'}
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
