import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SkeletonRow from "@/components/ui/SkeletonRow";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowRight, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/button';
import Pagination from '@mui/material/Pagination';
import { SupplierDto } from '../../types/supplier-dto';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/table';
import useSupplierService from '@/services/supplierService';

// SupplierTableProps kaldırıldı

const cardStyle = {
  background: '#f6f8fa',
  borderRadius: '16px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  padding: '24px',
  marginBottom: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'box-shadow 0.2s',
};

const infoStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px',
};

const nameStyle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#181C2A',
};

const emailStyle = {
  fontSize: '1rem',
  color: '#555',
};

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#6B73FF',
  borderRadius: '6px',
  padding: '6px',
  fontSize: '1.4rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'background 0.2s',
};



const PAGE_SIZE_OPTIONS = [10, 20, 50];

const SupplierTable: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const router = useRouter();
  // Read page and pageSize from URL query params
  const queryPage = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;
  const queryPageSize = typeof router.query.pageSize === 'string' ? parseInt(router.query.pageSize) : 10;
  const [page, setPage] = React.useState(queryPage);
  const [pageSize, setPageSize] = React.useState(queryPageSize);
  const { getSuppliers, deleteSupplier } = useSupplierService();
  const queryClient = useQueryClient();
  const { data: supplierList = [], isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await getSuppliers();
      return (res && res.success && res.data) ? res.data : [];
    },
    staleTime: 5 * 60 * 1000 // 5 dakika
  });
  const deleteMutation = useMutation({
    mutationFn: async (supplierId: string) => await deleteSupplier(supplierId),
  onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["suppliers"] }); }
  });

  // Global filtrelenmiş tedarikçi listesi (ad, telefon veya email)
  const filteredList = supplierList.filter(s => {
    const search = globalFilter.toLowerCase();
    return (
      s.name.toLowerCase().includes(search) ||
      (s.phoneNumber && s.phoneNumber.toLowerCase().includes(search)) ||
      (s.email && s.email.toLowerCase().includes(search))
    );
  });

  const refreshSuppliers = async () => {
  // React Query ile cache yönetildiği için gerek yok
  };

  const handleDelete = async (supplierId: string) => {
  await deleteMutation.mutateAsync(supplierId);
  };
  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);

  // Sync page/pageSize state with URL query params
  React.useEffect(() => {
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

  if (isMobile) {
    return (
      <div style={{ marginTop: 8 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Tedarikçi adı, Telefon veya Email"
            value={globalFilter}
            onChange={e => { setGlobalFilter(e.target.value); setPage(1); }}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e3e8f0', width: '100%', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : paginatedList.map((supplier) => (
                <div key={supplier.supplierId} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{supplier.name}</span>
                    <span style={{ color: '#888', fontSize: 14 }}>{supplier.phoneNumber}</span>
                    {supplier.email && (
                      <span style={{ color: '#888', fontSize: 14 }}>{supplier.email}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Link href={{
                      pathname: `/suppliers/${supplier.supplierId}`,
                      query: { page, pageSize }
                    }}>
                      <Button variant="ghost" size="icon" title="Detay">
                        <FiArrowRight />
                      </Button>
                    </Link>
                    <Link href={{
                      pathname: `/suppliers/edit`,
                      query: { id: supplier.supplierId, page, pageSize }
                    }}>
                      <Button variant="outline" size="icon" style={{ color: '#FFB800', borderColor: '#FFB800' }} title="Güncelle">
                        <FiEdit2 />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      title="Sil"
                      onClick={() => { setDeleteId(supplier.supplierId); setConfirmOpen(true); }}
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
          description="Bu tedarikçiyi silmek istediğinize emin misiniz?"
          onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
          onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
        />
        {/* MUI Pagination Controls (mobilde de göster) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', justifyContent: 'flex-start' }}>
        <input
          type="text"
          placeholder="Tedarikçi adı, Telefon veya Email"
          value={globalFilter}
          onChange={e => { setGlobalFilter(e.target.value); setPage(1); }}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e3e8f0', width: '320px', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ad</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Email</TableHead>
            <TableHead style={{ textAlign: 'center' }}>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <div style={{ width: "100%" }}><SkeletonRow /></div>
                  </TableCell>
                </TableRow>
              ))
            : paginatedList.map((supplier, idx) => (
                <TableRow key={supplier.supplierId || idx}>
                  <TableCell style={{ fontWeight: 600 }}>{supplier.name}</TableCell>
                  <TableCell>{supplier.phoneNumber}</TableCell>
                  <TableCell>{supplier.email || ''}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <Link href={{
                        pathname: `/suppliers/${supplier.supplierId}`,
                        query: { page, pageSize }
                      }}>
                        <Button variant="ghost" size="icon" title="Detay">
                          <FiArrowRight />
                        </Button>
                      </Link>
                      <Link href={{
                        pathname: `/suppliers/edit`,
                        query: { id: supplier.supplierId, page, pageSize }
                      }}>
                        <Button variant="outline" size="icon" style={{ color: '#FFB800', borderColor: '#FFB800' }} title="Güncelle">
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        title="Sil"
                        onClick={() => { setDeleteId(supplier.supplierId); setConfirmOpen(true); }}
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
        description="Bu tedarikçiyi silmek istediğinize emin misiniz?"
        onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
      {/* MUI Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '18px', gap: '16px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => updatePagination(value)}
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

export default SupplierTable;
