// pages/index.tsx
import Head from "next/head";
import React from "react";
import SkeletonRow from "../components/ui/SkeletonRow";
import useDashboardService from "../services/dashboardService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table } from "../components/ui/table";
import { FiUsers, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Button } from "../components/ui/button";
import { ApexOptions } from "apexcharts";

type ApexAxisChartSeries = Array<{ name: string; data: number[] }>;

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import {
  DashboardSummaryResponse,
  DashboardCriticalStockProductDto
} from "../types/dashboard-dto";

// ---------- Dashboard ----------
const Home: React.FC = () => {
  const { getDashboardSummary } = useDashboardService();
  const queryClient = useQueryClient();
  const { data: dashboard, isLoading: loading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await getDashboardSummary();
      return (res && res.success && res.data) ? res.data : null;
    },
    staleTime: 5 * 60 * 1000 // 5 dakika
  });

// ---------- Components ----------
const KpiCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <Card className="rounded-xl shadow-sm p-4 flex items-center gap-4 bg-white hover:shadow-md transition-all duration-200" style={{ minHeight: 120 }}>
    <div className="text-gray-600 text-3xl">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <span className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</span>
    </div>
  </Card>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode; height?: number }> = ({ title, children, height = 400 }) => (
  <Card className="rounded-xl shadow-sm p-4 w-full bg-white hover:shadow-md transition-all duration-200" style={{ minHeight: height }}>
    <CardHeader>
      <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-center text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-center items-center">{children}</CardContent>
  </Card>
);

const ListCard: React.FC<{ title: string; items: DashboardCriticalStockProductDto[]; columns: string[]; maxHeight?: number; }> = ({ title, items, columns, maxHeight = 260 }) => (
  <Card className="rounded-xl shadow-sm p-4 w-full bg-white hover:shadow-md transition-all duration-200">
    <CardHeader>
      <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-center text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <Table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-2 px-3 text-left text-gray-700 font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                {columns.map((col, idx) => (
                  <td key={idx} className="py-2 px-3 font-medium text-gray-700">
                    {col === "Bakım" || col === "Sipariş" ? item.name : null}
                    {col === "Ürün" ? item.name : null}
                    {col === "Stok" ? item.stock : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </CardContent>
  </Card>
);


  // Filter and sort upcoming maintenances by date proximity (next 7 days)
  const today = new Date();
  const getDateDiff = (dateStr: string) => {
    const date = new Date(dateStr);
    return Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const filteredMaintenances = (dashboard?.upcomingMaintenances || [])
    .map((m) => ({ ...m, diff: m.date ? getDateDiff(m.date) : 999 }))
    .filter((m) => m.diff >= 0 && m.diff <= 7)
    .sort((a, b) => a.diff - b.diff);

  const chartOptions = (categories: string[]): ApexOptions => ({
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    xaxis: { categories },
    yaxis: { labels: { formatter: (val) => `${val} ₺` } },
    colors: ["#1d4ed8", "#dc2626"],
    tooltip: { y: { formatter: (val) => `${val} ₺` } },
    legend: { position: "top", horizontalAlign: "right" },
  });

  const monthlySeries: ApexAxisChartSeries = [
    { name: "Gelir", data: (dashboard?.monthlyIncomeExpense || []).map((m) => m.gelir) },
    { name: "Gider", data: (dashboard?.monthlyIncomeExpense || []).map((m) => m.gider) },
  ];

  const yearlySeries: ApexAxisChartSeries = [
    { name: "Gelir", data: (dashboard?.yearlyIncomeExpense || []).map((y) => y.gelir) },
    { name: "Gider", data: (dashboard?.yearlyIncomeExpense || []).map((y) => y.gider) },
  ];

  // Responsive design for upcoming maintenances (card on mobile, table on desktop)
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <>
      <Head>
        <title>Kurumsal Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
            ) : (
              <>
                <KpiCard title="Toplam Aktif Müşteri" value={dashboard?.totalActiveCustomers ?? 0} icon={<FiUsers />} />
                <KpiCard title="Gelir" value={
                  (dashboard?.monthlyIncomeExpense?.reduce((sum, m) => sum + (m.gelir || 0), 0)) ?? 0
                } icon={<FiArrowUp />} />
                <KpiCard title="Gider" value={
                  (dashboard?.monthlyIncomeExpense?.reduce((sum, m) => sum + (m.gider || 0), 0)) ?? 0
                } icon={<FiArrowDown />} />
              </>
            )}
          </div>

          {/* Yaklaşan Bakımlar */}
          <div className="grid grid-cols-1 gap-4">
            <Card
              style={(() => {
                if (isMobile) {
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
                  margin: "0px",
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
                      marginBottom: isMobile ? 0 : 24,
                    }}
                  >
                    <span
                      className="text-2xl font-bold text-primary"
                      style={{ marginBottom: isMobile ? 0 : 24, fontSize: isMobile ? 20 : undefined }}
                    >
                      Yaklaşan Bakımlar (Önemli)
                    </span>
                    {/* Toplu ekleme aksiyonu kaldırıldı */}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  isMobile ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
                    </div>
                  ) : (
                    <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
                      <Table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Müşteri</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Bakım</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Tarih</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Aksiyon</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                              <td colSpan={4}><SkeletonRow /></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )
                ) : (
                  isMobile ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        maxHeight: 5 * 112 + 4 * 12,
                        overflowY: "auto",
                        WebkitOverflowScrolling: "touch"
                      }}
                    >
                      {filteredMaintenances.map((item) => {
                        let bg = "#fff";
                        let color = "#222";
                        let actionColor = "#222";
                        if (item.diff === 0) { bg = "#b91c1c"; color = "#fff"; actionColor = "#fff"; }
                        else if (item.diff <= 3) { bg = "#fca5a5"; }
                        else if (item.diff <= 5) { bg = "#fdba74"; }
                        else { bg = "#fef08a"; }
                        return (
                          <div key={item.customer + item.productName + item.date} style={{ background: bg, color, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 16, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <div style={{ fontWeight: 600, fontSize: 16 }}>{item.customer}</div>
                              <div style={{ fontSize: 14 }}>{item.productName}</div>
                              <div style={{ fontSize: 14 }}>Tarih: {item.date}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Link href={`/customers/${item.customerId}?from=dashboard`}>
                                <span title="Müşteri Detayı" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                                  <FiUsers style={{ fontSize: 20, color: actionColor }} />
                                </span>
                              </Link>
                              <Link href={`/customers/${item.customerId}/orders/${item.orderCode}/maintenances/add`}>
                                <Button
                                  variant="default"
                                  size="icon"
                                  style={{
                                    borderRadius: 8,
                                    width: 40,
                                    height: 40,
                                    padding: 0,
                                    fontSize: 22,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: actionColor === '#fff' ? '#fff' : '#222',
                                    color: actionColor === '#fff' ? '#b91c1c' : '#fff',
                                    border: actionColor === '#fff' ? '2px solid #b91c1c' : 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                                  }}
                                >
                                  +
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
                      <Table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Müşteri</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Bakım</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Tarih</th>
                            <th className="py-2 px-3 text-left text-gray-700 font-medium">Aksiyon</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMaintenances.map((item) => {
                            let bg = "#fff";
                            let color = "#222";
                            let actionColor = "#222";
                            if (item.diff === 0) { bg = "#b91c1c"; color = "#fff"; actionColor = "#fff"; }
                            else if (item.diff <= 3) { bg = "#fca5a5"; }
                            else if (item.diff <= 5) { bg = "#fdba74"; }
                            else { bg = "#fef08a"; }
                            return (
                              <tr key={item.customer + item.productName + item.date} style={{ background: bg, color }} className={`border-b`}>
                                <td className="py-2 px-3 font-medium">{item.customer}</td>
                                <td className="py-2 px-3 font-medium">{item.productName}</td>
                                <td className="py-2 px-3 font-medium">{item.date}</td>
                                <td className="py-2 px-3 font-medium">
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Link href={`/customers/${item.customerId}?from=dashboard`}>
                                      <span title="Müşteri Detayı" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                                        <FiUsers style={{ fontSize: 20, color: actionColor }} />
                                      </span>
                                    </Link>
                                    <Link href={`/customers/${item.customerId}/orders/${item.orderCode}/maintenances/add`}>
                                      <Button
                                        variant="default"
                                        size="icon"
                                        style={{
                                          borderRadius: 8,
                                          width: 40,
                                          height: 40,
                                          padding: 0,
                                          fontSize: 22,
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          background: actionColor === '#fff' ? '#fff' : '#222',
                                          color: actionColor === '#fff' ? '#b91c1c' : '#fff',
                                          border: actionColor === '#fff' ? '2px solid #b91c1c' : '2px solid #222',
                                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                                        }}
                                      >
                                        +
                                      </Button>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bakımı Geciken Siparişler ve Kritik Stok */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card
              style={(() => {
                if (isMobile) {
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
                  margin: "0px",
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
                      marginBottom: isMobile ? 0 : 24,
                    }}
                  >
                    <span
                      className="text-2xl font-bold text-primary"
                      style={{ marginBottom: isMobile ? 0 : 24, fontSize: isMobile ? 20 : undefined }}
                    >
                      Bakımı Geciken Siparişler
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isMobile ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      gap: 12,
                      maxHeight: 5 * 112 + 4 * 12, // 5 items, each ~112px tall + 4 gaps
                      overflowY: "auto",
                      WebkitOverflowScrolling: "touch"
                      }}
                    >
                      {(dashboard?.overdueMaintenances || []).map((item) => {
                        const bg = "#b91c1c";
                        const color = "#fff";
                        return (
                          <div key={item.customer + item.productName + item.date} style={{ background: bg, color, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 16, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <div style={{ fontWeight: 600, fontSize: 16 }}>{item.customer}</div>
                              <div style={{ fontSize: 14 }}>{item.productName}</div>
                              <div style={{ fontSize: 14 }}>Tarih: {item.date}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Link href={`/customers/${item.customerId}`}>
                                <span title="Müşteri Detayı" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                                  <FiUsers style={{ fontSize: 20, color: '#fff' }} />
                                </span>
                              </Link>
                              <Link href={`/customers/${item.customerId}/orders/${item.orderCode}/maintenances/add`}>
                                <Button
                                  variant="default"
                                  size="icon"
                                  style={{ borderRadius: 8, width: 40, height: 40, padding: 0, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#b91c1c' }}
                                >
                                  +
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                ) : (
                  <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
                    <Table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-3 text-left text-gray-700 font-medium">Müşteri</th>
                          <th className="py-2 px-3 text-left text-gray-700 font-medium">Ürün</th>
                          <th className="py-2 px-3 text-left text-gray-700 font-medium">Tarih</th>
                          <th className="py-2 px-3 text-left text-gray-700 font-medium">Aksiyon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(dashboard?.overdueMaintenances || []).map((item) => {
                          return (
                            <tr key={item.customer + item.productName + item.date} style={{ background: '#b91c1c', color: '#fff' }} className={`border-b`}>
                              <td className="py-2 px-3 font-medium">{item.customer}</td>
                              <td className="py-2 px-3 font-medium">{item.productName}</td>
                              <td className="py-2 px-3 font-medium">{item.date}</td>
                              <td className="py-2 px-3 font-medium">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <Link href={`/customers/${item.customerId}`}>
                                    <span title="Müşteri Detayı" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                                      <FiUsers style={{ fontSize: 20, color: '#fff' }} />
                                    </span>
                                  </Link>
                                  <Link href={`/customers/${item.customerId}/orders/${item.orderCode}/maintenances/add`}>
                                    <Button
                                      variant="default"
                                      size="icon"
                                      style={{ borderRadius: 8, width: 40, height: 40, padding: 0, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#b91c1c' }}
                                    >
                                      +
                                    </Button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
            <ListCard title="Stokta Kritik Ürünler" items={dashboard?.criticalStockProducts || []} columns={["Ürün", "Stok"]} maxHeight={300} />
          </div>

          {/* Gelir/Gider Grafikleri */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Aylık Gelir / Gider" height={400}>
              <ReactApexChart options={chartOptions((dashboard?.monthlyIncomeExpense || []).map((m) => m.month))} series={monthlySeries} type="bar" height={350} />
            </ChartCard>
            <ChartCard title="Yıllık Gelir / Gider" height={400}>
              <ReactApexChart options={chartOptions((dashboard?.yearlyIncomeExpense || []).map((y) => y.month))} series={yearlySeries} type="bar" height={350} />
            </ChartCard>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
