import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonRow from '@/components/ui/SkeletonRow';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as Popover from '@radix-ui/react-popover';
import { FiBox, FiArrowLeft, FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import useCustomerService from '@/services/customerService';
import { ItemDto } from '@/types/item-dto';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDateTR } from '@/lib/utils';
export default function CustomerDetail() {
  const router = useRouter();
  const { id, page, pageSize } = router.query;
  const customerId = typeof id === 'string' ? id : '';
  // (Tekrar tanımlama kaldırıldı)
  const {
    data: customer,
    isLoading: loadingCustomer
  } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      if (!customerId) return null;
      const res = await getCustomerById(customerId);
      return (res && res.success && res.data) ? res.data : null;
    },
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000
  });
  const {
    data: orders = [],
    isLoading: loadingOrders
  } = useQuery({
    queryKey: ['customerOrders', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const res = await getCustomerOrders(customerId);
      return (res && res.success && res.data) ? res.data : [];
    },
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000
  });
  const {
    data: maintenances = [],
    isLoading: loadingMaintenances
  } = useQuery({
    queryKey: ['customerMaintenances', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const res = await getCustomerMaintenances(customerId);
      return (res && res.success && res.data) ? res.data : [];
    },
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000
  });
  const [orderFilter, setOrderFilter] = useState('');
  const [maintenanceFilter, setMaintenanceFilter] = useState('');
  const { getCustomerById, getCustomerOrders, getCustomerMaintenances } = useCustomerService();

  // useEffect kaldırıldı, React Query ile fetch ediliyor

  if (loadingCustomer) {
    return <>
      <Head><title>Müşteri Detay</title></Head>
      <Card style={{ maxWidth: '1100px', margin: '0px 0 0 16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '40px 32px', border: '1px solid #e3e8f0' }}>
        <CardHeader>
          <CardTitle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 24, minHeight: 40 }}>
              <SkeletonRow />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonRow />
        </CardContent>
      </Card>
    </>;
  }
  if (!customer) return null;

  return (
    <>
      <Head>
        <title>Müşteri Detay</title>
      </Head>
      <Card
        style={(() => {
          if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            return {
              maxWidth: '100vw',
              marginTop: 16,
              background: '#fff',
              borderRadius: 0,
              boxShadow: 'none',
              padding: '16px',
              border: 'none',
            };
          }
          return {
            maxWidth: '1100px',
            margin: '0px 0 0 16px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '40px 32px',
            border: '1px solid #e3e8f0',
          };
        })()}
      >
      <CardHeader>
        <CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 24, minHeight: 40 }}>
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                if (router.query.from === "dashboard") {
                  router.push("/");
                } else {
                  router.push({
                    pathname: '/customers',
                    query: { ...(page ? { page } : {}), ...(pageSize ? { pageSize } : {}) }
                  });
                }
              }}
              style={{ position: 'absolute', left: 0 }}
            >
              <FiArrowLeft className="text-lg" />
            </Button>
            <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
              {customer.firstName} {customer.lastName}
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ marginBottom: '24px' }}>
          <div><b>Email:</b> {customer.email}</div>
          <div><b>Telefon:</b> {customer.phoneNumber}</div>
          <div><b>Adres:</b> {customer.address}</div>
        </div>
        {/* Siparişler ve Sipariş Ekle her zaman görünür */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: '1.3rem', color: '#181C2A', margin: 0 }}>Siparişler</h2>
          <Link href={`/customers/${customer.customerId}/orders/add`}>
            {typeof window !== 'undefined' && window.innerWidth > 768 ? (
              <Button variant="default" size="lg" title="Sipariş Ekle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiPlus /> <span>Sipariş Ekle</span>
              </Button>
            ) : (
              <Button variant="default" size="icon" title="Sipariş Ekle">
                <FiPlus />
              </Button>
            )}
          </Link>
        </div>
        {orders.length > 0 && (
          <input
            type="text"
            placeholder="Ürün adına göre filtrele..."
            value={orderFilter}
            onChange={e => setOrderFilter(e.target.value)}
            style={{ marginBottom: '12px', padding: '8px', borderRadius: '6px', border: '1px solid #e3e8f0', width: '260px' }}
          />
        )}
        {loadingOrders ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : orders.length === 0 ? (
          <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>Henüz sipariş yok.</div>
        ) : (
          typeof window !== 'undefined' && window.innerWidth <= 768 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {orders
                .filter(order =>
                  order.orderItems.some(item =>
                    item.productName.toLowerCase().includes(orderFilter.toLowerCase())
                  )
                )
                .map((order, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>#{order.orderCode}</span>
                      <span style={{ color: '#888', fontSize: 14 }}>{formatDateTR(order.orderDate)}</span>
                    </div>
                    <div style={{ color: '#888', fontSize: 14 }}>Bakım: {formatDateTR(order.maintenanceDate)}</div>
                    <div style={{ color: '#888', fontSize: 14 }}>Tutar: <b style={{ color: '#181C2A' }}>{order.price} ₺</b></div>
                    <div style={{ color: '#888', fontSize: 14 }}>Ürünler: {order.orderItems.length === 1 ? (
                      <span>{order.orderItems[0].productName}</span>
                    ) : (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <button style={{ background: 'none', border: 'none', color: '#6B73FF', borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '1.4rem' }} title="Ürünleri Gör">
                            <FiBox />
                          </button>
                        </Popover.Trigger>
                        <Popover.Content sideOffset={8} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: '24px', minWidth: '220px', zIndex: 999 }}>
                          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: '#000DFF' }}>Sipariş Ürünleri</div>
                          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {order.orderItems.map((item: ItemDto, idx) => (
                              <li key={idx} style={{ marginBottom: '8px', fontSize: '1rem', color: '#181C2A' }}>
                                {item.productName} <span style={{ color: '#888' }}>x{item.quantity}</span>
                              </li>
                            ))}
                          </ul>
                        </Popover.Content>
                      </Popover.Root>
                    )}</div>
                    <Button
                      variant="default"
                      size="sm"
                      style={{
                        background: 'linear-gradient(90deg, #FFB800 0%, #FFD700 100%)',
                        color: '#181C2A',
                        borderRadius: '8px',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(255,184,0,0.10)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 18px',
                        transition: 'background 0.2s',
                        alignSelf: 'flex-end',
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFB800 100%)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #FFB800 0%, #FFD700 100%)')}
                      onClick={() => router.push(`/customers/${customer.customerId}/orders/${order.orderCode}/maintenances/add`)}
                    >
                      <FiPlus style={{ fontSize: '1.1rem' }} /> Bakım Ekle
                    </Button>
                  </div>
                ))}
            </div>
          ) : (
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead>Kod</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Bakım Tarihi</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Ürün</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders
                  .filter(order =>
                    order.orderItems.some(item =>
                      item.productName.toLowerCase().includes(orderFilter.toLowerCase())
                    )
                  )
                  .map((order, i) => (
                    <TableRow key={i}>
                      <TableCell>#{order.orderCode}</TableCell>
                      <TableCell>{formatDateTR(order.orderDate)}</TableCell>
                      <TableCell>{formatDateTR(order.maintenanceDate)}</TableCell>
                      <TableCell>{order.price} ₺</TableCell>
                      <TableCell>
                        {order.orderItems.length === 1 ? (
                          <span>{order.orderItems[0].productName}</span>
                        ) : (
                          <Popover.Root>
                            <Popover.Trigger asChild>
                              <button style={{ background: 'none', border: 'none', color: '#6B73FF', borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '1.4rem' }} title="Ürünleri Gör">
                                <FiBox />
                              </button>
                            </Popover.Trigger>
                            <Popover.Content sideOffset={8} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: '24px', minWidth: '220px', zIndex: 999 }}>
                              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: '#000DFF' }}>Sipariş Ürünleri</div>
                              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                {order.orderItems.map((item: ItemDto, idx) => (
                                  <li key={idx} style={{ marginBottom: '8px', fontSize: '1rem', color: '#181C2A' }}>
                                    {item.productName} <span style={{ color: '#888' }}>x{item.quantity}</span>
                                  </li>
                                ))}
                              </ul>
                            </Popover.Content>
                          </Popover.Root>
                        )}
                      </TableCell>
                      <TableCell style={{ cursor: 'default' }}>
                        <Button
                          variant="default"
                          size="sm"
                          style={{
                            background: 'linear-gradient(90deg, #FFB800 0%, #FFD700 100%)',
                            color: '#181C2A',
                            borderRadius: '8px',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(255,184,0,0.10)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 18px',
                            transition: 'background 0.2s',
                          }}
                          onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFB800 100%)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #FFB800 0%, #FFD700 100%)')}
                          onClick={() => router.push(`/customers/${customer.customerId}/orders/${order.orderCode}/maintenances/add`)}
                        >
                          <FiPlus style={{ fontSize: '1.1rem' }} /> Bakım Ekle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )
        )}
        
        {
          loadingMaintenances ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : maintenances.length > 0 &&
          <>
            <h2 style={{ fontSize: '1.3rem', color: '#181C2A', marginBottom: '12px' }}>Bakımlar</h2>
            <input
              type="text"
              placeholder="Ürün adına göre filtrele..."
              value={maintenanceFilter}
              onChange={e => setMaintenanceFilter(e.target.value)}
              style={{ marginBottom: '12px', padding: '8px', borderRadius: '6px', border: '1px solid #e3e8f0', width: '260px' }}
            />
            {typeof window !== 'undefined' && window.innerWidth <= 768 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {maintenances
                  .filter(mnt =>
                    mnt.maintenanceItems.some(item =>
                      item.productName.toLowerCase().includes(maintenanceFilter.toLowerCase())
                    )
                  )
                  .map((mnt, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: 16 }}>#{mnt.orderCode}</span>
                        <span style={{ color: '#888', fontSize: 14 }}>{formatDateTR(mnt.maintenanceDate)}</span>
                      </div>
                      <div style={{ color: '#888', fontSize: 14 }}>Açıklama: {mnt.description}</div>
                      <div style={{ color: '#888', fontSize: 14 }}>Tutar: <b style={{ color: '#181C2A' }}>{mnt.price} ₺</b></div>
                      <div style={{ color: '#888', fontSize: 14 }}>Ürünler: {mnt.maintenanceItems.length === 1 ? (
                        <span>{mnt.maintenanceItems[0].productName}</span>
                      ) : (
                        <Popover.Root>
                          <Popover.Trigger asChild>
                            <button style={{ background: 'none', border: 'none', color: '#FFB800', borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '1.4rem' }} title="Ürünleri Gör">
                              <FiBox />
                            </button>
                          </Popover.Trigger>
                          <Popover.Content sideOffset={8} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: '24px', minWidth: '220px', zIndex: 999 }}>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: '#000DFF' }}>Bakım Ürünleri</div>
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                              {mnt.maintenanceItems.map((item: ItemDto, idx) => (
                                <li key={idx} style={{ marginBottom: '8px', fontSize: '1rem', color: '#181C2A' }}>
                                  {item.productName} <span style={{ color: '#888' }}>x{item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </Popover.Content>
                        </Popover.Root>
                      )}</div>
                    </div>
                  ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kod</TableHead>
                    <TableHead>Bakım Tarihi</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Ürün</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenances
                    .filter(mnt =>
                      mnt.maintenanceItems.some(item =>
                        item.productName.toLowerCase().includes(maintenanceFilter.toLowerCase())
                      )
                    )
                    .map((mnt, i) => (
                      <TableRow key={i}>
                        <TableCell>#{mnt.orderCode}</TableCell>
                        <TableCell>{formatDateTR(mnt.maintenanceDate)}</TableCell>
                        <TableCell>{mnt.description}</TableCell>
                        <TableCell>{mnt.price} ₺</TableCell>
                        <TableCell>
                          {mnt.maintenanceItems.length === 1 ? (
                            <span>{mnt.maintenanceItems[0].productName}</span>
                          ) : (
                            <Popover.Root>
                              <Popover.Trigger asChild>
                                <button style={{ background: 'none', border: 'none', color: '#FFB800', borderRadius: '6px', padding: '6px', cursor: 'pointer', fontSize: '1.4rem' }} title="Ürünleri Gör">
                                  <FiBox />
                                </button>
                              </Popover.Trigger>
                              <Popover.Content sideOffset={8} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: '24px', minWidth: '220px', zIndex: 999 }}>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: '#000DFF' }}>Bakım Ürünleri</div>
                                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                  {mnt.maintenanceItems.map((item: ItemDto, idx) => (
                                    <li key={idx} style={{ marginBottom: '8px', fontSize: '1rem', color: '#181C2A' }}>
                                      {item.productName} <span style={{ color: '#888' }}>x{item.quantity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </Popover.Content>
                            </Popover.Root>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </>
        }
      </CardContent>
    </Card>
    </>
  );
}