import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useProductService from '@/services/productService';
import { CreateProductCommandRequest, ProductType } from '@/types/product-dto';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type ProductFormValues = {
  request: CreateProductCommandRequest
};

export default function AddProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<ProductFormValues>({
    defaultValues: {
      request: {
        name: '',
        productType: ProductType.Device,
      }
    },
  });
  const { createProduct } = useProductService();

  const onSubmit = async (values: ProductFormValues) => {
  await createProduct(values.request);
  queryClient.invalidateQueries({ queryKey: ["products"] });
  router.push('/products');
  };

  return (
    <>
      <Head>
        <title>Ürün Ekle</title>
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
                onClick={() => router.push('/products')}
                style={{ position: 'absolute', left: 0 }}
              >
                <FiArrowLeft className="text-lg" />
              </Button>
              <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
                Ürün Ekle
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
                    <FormLabel>Ürün Adı</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ürün Adı" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="request.productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ürün Tipi</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                        className="border rounded-md px-3 py-2 w-full"
                      >
                        {Object.entries(ProductType)
                          .filter(([k, v]) => !isNaN(Number(v)))
                          .map(([key, value]) => {
                            let displayName = key;
                            if (key === 'Device') displayName = 'Cihaz';
                            else if (key === 'Filter') displayName = 'Filtre';
                            else if (key === 'Equipment') displayName = 'Ekipman';
                            return (
                              <option key={value} value={value}>{displayName}</option>
                            );
                          })}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" size="lg" className="w-full">Ekle</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}