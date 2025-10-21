import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowRight, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Pagination from '@mui/material/Pagination';
import { CustomerDto } from '../../types/customer-dto';
import useCustomerService from '../../services/customerService';
import SkeletonRow from "@/components/ui/SkeletonRow";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
// CustomerTableProps kaldırıldı

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const CustomerTable: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const router = useRouter();
  // Read page and pageSize from URL query params
  const queryPage = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;
  const queryPageSize = typeof router.query.pageSize === 'string' ? parseInt(router.query.pageSize) : 10;
  const [page, setPage] = React.useState(queryPage);
  const [pageSize, setPageSize] = React.useState(queryPageSize);
  const { getCustomers, deleteCustomer } = useCustomerService();
  const queryClient = useQueryClient();
  const { data: customerList = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await getCustomers();
      return (res && res.success && res.data) ? res.data : [];
    },
    staleTime: 5 * 60 * 1000 // 5 dakika
  });
  const deleteMutation = useMutation({
    mutationFn: async (customerId: string) => await deleteCustomer(customerId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["customers"] }); }
  });

  const refreshCustomers = async () => {
  // React Query ile cache yönetildiği için gerek yok
  };

  const handleDelete = async (customerId: string) => {
  await deleteMutation.mutateAsync(customerId);
  };

  // Global filtrelenmiş müşteri listesi (sadece ad soyad veya telefon)
  const filteredList = customerList.filter(c => {
  // ...existing code...
    const search = globalFilter.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search) ||
      c.phoneNumber.toLowerCase().includes(search)
    );
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);

  // Sync page/pageSize state with URL query params
  React.useEffect(() => {
    // Only update if different
    if (page !== queryPage || pageSize !== queryPageSize) {
      setPage(queryPage);
      setPageSize(queryPageSize);
    }
  }, [queryPage, queryPageSize]);

  const updatePagination = (newPage: number, newPageSize?: number) => {
    const params = {
      ...router.query,
      page: newPage,
      pageSize: newPageSize ?? pageSize,
    };
    router.replace({
      pathname: router.pathname,
      query: params,
    }, undefined, { shallow: true });
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;


  // Modern pagination: sadece ilk, son, aktif ve aktifin yanındakiler gösterilir, arası üç nokta ile gösterilir
  // Daha kararlı ve yaygın pagination algoritması
  // Daha güvenli ve tekrar etmeyen pagination algoritması
  function getPaginationRange(page: number, totalPages: number) {
    const range: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      let left = Math.max(2, page - 1);
      let right = Math.min(totalPages - 1, page + 1);
      if (page === 1) {
        right = 4;
      } else if (page === totalPages) {
        left = totalPages - 3;
      }
      range.push(1);
      if (left > 2) range.push('...');
      for (let i = left; i <= right; i++) {
        if (i > 1 && i < totalPages) range.push(i);
      }
      if (right < totalPages - 1) range.push('...');
      range.push(totalPages);
    }
    return range;
  }

  if (isMobile) {
    return (
      <div style={{ marginTop: 8 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Ad Soyad veya Telefon"
            value={globalFilter}
            onChange={e => { setGlobalFilter(e.target.value); setPage(1); }}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e3e8f0', width: '100%', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : paginatedList.map((customer) => (
                <div key={customer.customerId} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{customer.firstName} {customer.lastName}</span>
                    <span style={{ color: '#888', fontSize: 14 }}>{customer.phoneNumber}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Link href={{
                      pathname: `/customers/${customer.customerId}`,
                      query: { page, pageSize }
                    }}>
                      <Button variant="ghost" size="icon" title="Detay">
                        <FiArrowRight />
                      </Button>
                    </Link>
                    <Link href={{
                      pathname: `/customers/edit`,
                      query: { id: customer.customerId, page, pageSize }
                    }}>
                      <Button variant="outline" size="icon" style={{ color: '#FFB800', borderColor: '#FFB800' }} title="Güncelle">
                        <FiEdit2 />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      title="Sil"
                      onClick={() => { setDeleteId(customer.customerId ?? null); setConfirmOpen(true); }}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              ))}
        </div>
        {/* Onay Pop-up */}
  <ConfirmDialog
          open={confirmOpen}
          title="Silme Onayı"
          description="Bu müşteriyi silmek istediğinize emin misiniz?"
          onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
          onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
        />
        {/* MUI Pagination Controls (mobilde de göster) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => updatePagination(value)}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
            size="medium"
            sx={{
              '& .MuiPaginationItem-root': {
                minWidth: 36,
                minHeight: 36,
                fontSize: '1rem',
              },
            }}
          />
        </div>
      </div>
    );
  }

  // Masaüstü (tablo)
  return (
    <div style={{ marginTop: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Ad Soyad veya Telefon"
          value={globalFilter}
          onChange={e => { setGlobalFilter(e.target.value); setPage(1); }}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e3e8f0', width: '320px', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ad Soyad</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Adres</TableHead>
            <TableHead style={{ textAlign: 'center' }}>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <div style={{ width: "100%" }}><SkeletonRow /></div>
                  </TableCell>
                </TableRow>
              ))
            : paginatedList.map((customer, idx) => (
                <TableRow key={customer.customerId}>
                  <TableCell style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <Link href={{
                        pathname: `/customers/${customer.customerId}`,
                        query: { page, pageSize }
                      }}>
                        <Button variant="ghost" size="icon" title="Detay">
                          <FiArrowRight />
                        </Button>
                      </Link>
                      <Link href={{
                        pathname: `/customers/edit`,
                        query: { id: customer.customerId, page, pageSize }
                      }}>
                        <Button variant="outline" size="icon" style={{ color: '#FFB800', borderColor: '#FFB800' }} title="Güncelle">
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        title="Sil"
                        onClick={() => { setDeleteId(customer.customerId ?? null); setConfirmOpen(true); }}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {/* Onay Pop-up */}
      <ConfirmDialog
        open={confirmOpen}
        title="Silme Onayı"
        description="Bu müşteriyi silmek istediğinize emin misiniz?"
        onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
      {/* MUI Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
        <select
          value={pageSize}
          onChange={e => updatePagination(1, Number(e.target.value))}
          style={{ marginLeft: 12, padding: '6px 12px', borderRadius: '8px', border: '1px solid #e3e8f0', fontSize: '1rem', background: '#fff' }}
        >
          {PAGE_SIZE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomerTable;
