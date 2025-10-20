import Head from "next/head";
import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import CustomerTable from "../components/management/CustomerTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { CustomerDto } from "@/types/customer-dto";

export default function Customers() {
  return (
    <>
      <Head>
        <title>Müşteriler</title>
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
                  marginBottom: window.innerWidth <= 768 ? 0 : 24,
                }}
              >
                <span
                  className="text-2xl font-bold text-primary"
                  style={{ marginBottom: window.innerWidth <= 768 ? 0 : 24, fontSize: window.innerWidth <= 768 ? 20 : undefined }}
                >
                  Müşteri Listesi
                </span>
                <Link href="/customers/add">
                  <Button
                    variant="default"
                    size={window.innerWidth <= 768 ? "icon" : "lg"}
                    style={window.innerWidth <= 768 ? { borderRadius: 8, width: 40, height: 40, padding: 0, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}
                  >
                    {window.innerWidth <= 768 ? '+' : 'Müşteri Ekle'}
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
              <CustomerTable/>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
