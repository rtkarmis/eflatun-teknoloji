import React from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SkeletonRow from "@/components/ui/SkeletonRow";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Pagination from '@mui/material/Pagination';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import useProductService from "@/services/productService";
import { useRouter } from "next/router";

// ProductTableProps kaldırıldı

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const ProductTable: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const router = useRouter();
  const queryPage = router.query?.page ? Number(router.query.page) : 1;
  const queryPageSize = router.query?.pageSize ? Number(router.query.pageSize) : 10;
  const [page, setPage] = React.useState(queryPage);
  const [pageSize, setPageSize] = React.useState(queryPageSize);
  const { getProducts, deleteProduct } = useProductService();
  const queryClient = useQueryClient();
  const { data: productList = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProducts();
      return (res && res.success && res.data) ? res.data : [];
    },
    staleTime: 5 * 60 * 1000 // 5 dakika
  });
  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => await deleteProduct(productId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["products"] }); }
  });


  const handleDelete = async (productId: string) => {
    await deleteMutation.mutateAsync(productId);
  }

  // React Query ile cache yönetildiği için ek bir işleme gerek yok

  // Global filtrelenmiş ürün listesi (ad veya tür)
  const filteredList = productList.filter((p) => {
    const search = globalFilter.toLowerCase();
    return (
      p.name.toLowerCase().includes(search) ||
      (p.productTypeDisplayName &&
        p.productTypeDisplayName.toLowerCase().includes(search))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const paginatedList = filteredList.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Sync page and pageSize with URL
  React.useEffect(() => {
    const params: Record<string, string | number | undefined> = {};
    Object.entries(router.query).forEach(([key, value]) => {
      params[key] = Array.isArray(value) ? value[0] : value;
    });
    if (page !== queryPage) params.page = page;
    if (pageSize !== queryPageSize) params.pageSize = pageSize;
    router.replace({ pathname: router.pathname, query: params }, undefined, { shallow: true });
    // eslint-disable-next-line
  }, [page, pageSize]);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <div style={{ marginTop: 8 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Ürün adı veya türü"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              setPage(1);
            }}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #e3e8f0",
              width: "100%",
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : paginatedList.map((product) => (
                <div
                  key={product.productId}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    padding: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>
                      {product.name}
                    </span>
                    <span style={{ color: "#888", fontSize: 14 }}>
                      {product.productTypeDisplayName} | Stok: {product.stock}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Link href={{ pathname: '/products/edit', query: { id: product.productId, page, pageSize } }}>
                      <Button
                        variant="outline"
                        size="icon"
                        title="Güncelle"
                        style={{ color: "#FFB800", borderColor: "#FFB800" }}
                      >
                        <FiEdit2 />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      title="Sil"
                      onClick={() => { setDeleteId(product.productId ?? null); setConfirmOpen(true); }}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              ))}
        </div>
        {/* MUI Pagination Controls (mobilde de göster) */}
        {/* Onay Pop-up */}
        <ConfirmDialog
          open={confirmOpen}
          title="Silme Onayı"
          description="Bu ürünü silmek istediğinize emin misiniz?"
          onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
          onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
        />
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
    <div
      style={{
        marginTop: "24px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          justifyContent: "flex-start",
        }}
      >
        <input
          type="text"
          placeholder="Ürün adı veya türü"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #e3e8f0",
            width: "320px",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tür</TableHead>
            <TableHead>Ürün Adı</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead style={{ textAlign: "center" }}>İşlemler</TableHead>
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
            : paginatedList.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productTypeDisplayName}</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Link href={{ pathname: '/products/edit', query: { id: product.productId, page, pageSize } }}>
                        <Button
                          variant="outline"
                          size="icon"
                          title="Güncelle"
                          style={{ color: "#FFB800", borderColor: "#FFB800" }}
                        >
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        title="Sil"
                        onClick={() => { setDeleteId(product.productId ?? null); setConfirmOpen(true); }}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {/* MUI Pagination Controls */}
      {/* Onay Pop-up */}
      <ConfirmDialog
        open={confirmOpen}
        title="Silme Onayı"
        description="Bu ürünü silmek istediğinize emin misiniz?"
        onConfirm={() => { if (deleteId) handleDelete(deleteId); setConfirmOpen(false); setDeleteId(null); }}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '18px', gap: '16px' }}>
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
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
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

export default ProductTable;
