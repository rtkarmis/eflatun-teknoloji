import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonRow from '@/components/ui/SkeletonRow';
import { useRouter } from 'next/router';
import { SupplierDto } from '../../types/supplier-dto';
import { Button } from '@/components/ui/button';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import useSupplierService from '../../services/supplierService';
import { FiArrowLeft, FiBox, FiPlus } from 'react-icons/fi';
import { ItemDto } from '@/types/item-dto';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { OrderDto } from '@/types/order-dto';
import { formatDateTR } from '@/lib/utils';

export default function SupplierDetail() {
  const router = useRouter();
  const { id, page, pageSize } = router.query;
  const supplierId = typeof id === 'string' ? id : '';
  const { getSupplierById, getSupplierOrders } = useSupplierService();
  const [orderFilter, setOrderFilter] = React.useState('');

  // React Query ile supplier ve orders ayrı ayrı çekiliyor
  const {
    data: supplier,
    isLoading: loadingSupplier
  } = useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: async () => {
      if (!supplierId) return null;
      const res = await getSupplierById(supplierId);
      return (res && res.success && res.data) ? res.data : null;
    },
    enabled: !!supplierId,
    staleTime: 5 * 60 * 1000
  });
  const {
    data: orders = [],
    isLoading: loadingOrders
  } = useQuery({
    queryKey: ['supplierOrders', supplierId],
    queryFn: async () => {
      if (!supplierId) return [];
      const res = await getSupplierOrders(supplierId);
      return (res && res.success && res.data) ? res.data : [];
    },
    enabled: !!supplierId,
    staleTime: 5 * 60 * 1000
  });

  if (loadingSupplier) {
    return <>
      <Head><title>Tedarikçi Detay</title></Head>
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
  if (!supplier) return null;

  return (
    <>
      <Head>
        <title>Tedarikçi Detay</title>
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
                  if (page || pageSize) {
                    router.push({
                      pathname: '/suppliers',
                      query: { ...(page ? { page } : {}), ...(pageSize ? { pageSize } : {}) }
                    });
                  } else {
                    router.push('/suppliers');
                  }
                }}
                style={{ position: 'absolute', left: 0 }}
              >
                <FiArrowLeft className="text-lg" />
              </Button>
              <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
                {supplier.name}
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ marginBottom: '24px' }}>
            <div><b>Email:</b> {supplier.email}</div>
            <div><b>Telefon:</b> {supplier.phoneNumber}</div>
          </div>
          {/* Siparişler ve Sipariş Ekle her zaman görünür */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: '1.3rem', color: '#181C2A', margin: 0 }}>Siparişler</h2>
            <Link href={`/suppliers/${supplier.supplierId}/orders/add`}>
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
                              {order.orderItems.map((item: ItemDto, idx: number) => (
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
              <Table className="mb-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Kod</TableHead>
                    <TableHead>Tarih</TableHead>
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
                                  {order.orderItems.map((item: ItemDto, idx: number) => (
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
            )
          )}
      </CardContent>
      </Card>
      </>
  );
}
