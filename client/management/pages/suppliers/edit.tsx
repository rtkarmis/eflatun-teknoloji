import Head from 'next/head';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonRow from '@/components/ui/SkeletonRow';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import useSupplierService from '@/services/supplierService';
import { UpdateSupplierCommandRequest } from '@/types/supplier-dto';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

type SupplierFormValues = {
  request: UpdateSupplierCommandRequest;
};

export default function EditSupplier() {
  const router = useRouter();
  const { id, page, pageSize } = router.query;
  const form = useForm<SupplierFormValues>({
    defaultValues: {
      request: {
        supplierId: '',
        name: '',
        email: '',
        phoneNumber: '',
      },
    },
  });
  const { updateSupplier, getSupplierById } = useSupplierService();

  const {
    data: supplier,
    isLoading: loadingSupplier
  } = useQuery({
    queryKey: ['supplier', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getSupplierById(String(id));
      return (res && res.success && res.data) ? res.data : null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });

  React.useEffect(() => {
    if (supplier) {
      form.reset({
        request: {
          supplierId: supplier.supplierId,
          name: supplier.name,
          email: supplier.email,
          phoneNumber: supplier.phoneNumber,
        },
      });
    }
  }, [supplier]);

  const onSubmit = async (values: SupplierFormValues) => {
    const res = await updateSupplier(String(id), values.request);
    if (res && res.success) {
      if (page || pageSize) {
        router.push({
          pathname: '/suppliers',
          query: { ...(page ? { page } : {}), ...(pageSize ? { pageSize } : {}) }
        });
      } else {
        router.push('/suppliers');
      }
    }
    // else hata mesajı gösterilebilir
  };

  if (loadingSupplier) {
    return (
      <Card style={{ maxWidth: '1100px', margin: '0px 0 0 16px', background: '#fff', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', padding: '40px 32px', border: '1px solid #e3e8f0' }}>
        <SkeletonRow />
      </Card>
    );
  }

  return (
    <>
      <Head>
        <title>Tedarikçi Düzenle</title>
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
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
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
              Tedarikçi Güncelle
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="request.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ad" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="request.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="request.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Telefon" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" size="lg" className="w-full">Güncelle</Button>
          </form>
        </Form>
      </CardContent>
      </Card>
    </>
  );
}
