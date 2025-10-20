import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateOrderMaintenanceRequest } from "@/types/maintenance-dto";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useProductService from "@/services/productService";
import useCustomerService from "@/services/customerService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type MaintenanceFormValues = {
  request: CreateOrderMaintenanceRequest;
};

export default function AddOrderMaintenance() {
  const router = useRouter();
  const { id, orderCode } = router.query;
  const queryClient = useQueryClient();
  const { getProducts } = useProductService();
  const { createCustomerMaintenance } = useCustomerService();


  // Always call hooks at the top level
  const {
    data: products = [],
    isLoading: loadingProducts
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await getProducts();
      return (res && res.success && res.data) ? res.data : [];
    },
    staleTime: 5 * 60 * 1000 // 5 dakika cache
  });

  const form = useForm<MaintenanceFormValues>({
    defaultValues: {
      request: {
        orderCode: orderCode as string,
        maintenanceItems: [],
        totalPrice: 0,
        maintenanceDay: 1,
        description: ""
      }
    }
  });

  if (loadingProducts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bakım Ekle (Sipariş)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Skeleton loading rows for products */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (values: MaintenanceFormValues) => {
    // Call API to create maintenance
    const res = await createCustomerMaintenance(id as string, values.request);
    if (res && res.success) {
      queryClient.invalidateQueries({ queryKey: ["customerMaintenances", id] });
      router.push(`/customers/${id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Bakım Ekle (Sipariş)</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 24, minHeight: 40 }}>
              <Button
                variant="default"
                size="icon"
                onClick={() => router.push(`/customers/${id}`)}
                style={{ position: "absolute", left: 0 }}
              >
                <FiArrowLeft className="text-lg" />
              </Button>
              <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: "center" }}>
                Bakım Ekle (Sipariş)
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <Input value={`#${orderCode as string}`} disabled className="bg-muted" />
              {/* Çoklu bakım ürünü ve adet seçimi */}
              {form.watch("request.maintenanceItems").length > 0 && (
                <div className="flex flex-col gap-4 mb-4">
                  {form.watch("request.maintenanceItems").map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={item.productId}
                        onChange={e => {
                          const items = [...form.getValues("request.maintenanceItems")];
                          items[idx].productId = e.target.value;
                          form.setValue("request.maintenanceItems", items);
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Ürün Seç</option>
                        {products.map(product => (
                          <option key={product.productId} value={product.productId}>
                            {product.name} (Stok: {product.stock ?? 0})
                          </option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => {
                          const items = [...form.getValues("request.maintenanceItems")];
                          items[idx].quantity = Number(e.target.value);
                          form.setValue("request.maintenanceItems", items);
                        }}
                        className="w-20"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const items = [...form.getValues("request.maintenanceItems")];
                          items.splice(idx, 1);
                          form.setValue("request.maintenanceItems", items);
                        }}
                        title="Ürünü kaldır"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button
                type="button"
                variant="default"
                size="lg"
                className="mb-2 font-bold text-base flex items-center justify-center gap-2"
                style={{ alignSelf: "flex-start", minWidth: "120px", width: "120px", padding: "12px 0" }}
                disabled={products.length === 0}
                onClick={() =>
                  form.setValue("request.maintenanceItems", [
                    { productId: products[0]?.productId || "", quantity: 1 },
                    ...form.getValues("request.maintenanceItems")
                  ])
                }
              >
                <FiPlus className="text-lg" />
                Ürün Ekle
              </Button>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="request.totalPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Toplam Tutar</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Toplam Tutar"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="request.maintenanceDay"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Bakım Kaç Gün Sonra</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Bakım Kaçıncı Gün"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="request.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Açıklama" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={
                  form.watch("request.maintenanceItems").length === 0 ||
                  !form.watch("request.totalPrice") ||
                  !form.watch("request.maintenanceDay") ||
                  Number(form.watch("request.totalPrice")) <= 0 ||
                  Number(form.watch("request.maintenanceDay")) <= 0
                }
              >
                Ekle
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
