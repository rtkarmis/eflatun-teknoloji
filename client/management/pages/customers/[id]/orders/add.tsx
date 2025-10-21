import Head from 'next/head';
import React from "react";
import { useRouter } from "next/router";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProductService from "@/services/productService";
import useCustomerService from "@/services/customerService";
import { CreateCustomerOrderCommandRequest } from "@/types/order-dto";
import { ProductDto } from "@/types/product-dto";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type OrderFormValues = {
  request: CreateCustomerOrderCommandRequest;
};

export default function AddOrder() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const form = useForm<OrderFormValues>({
    defaultValues: {
      request: {
        totalPrice: 0,
        maintenanceDay: 0,
        orderItems: [],
      },
    },
  });
  const { getProducts } = useProductService();
  const { createCustomerOrder } = useCustomerService();

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
  const onSubmit = async (values: OrderFormValues) => {
    const res = await createCustomerOrder(String(id), values.request);
    if (res && res.success) {
      queryClient.invalidateQueries({ queryKey: ["customerOrders", id] });
      router.push(`/customers/${id}`);
    }
    // else hata mesajı gösterilebilir
  };

  // Responsive card style logic (same as customer add)
  const getCardStyle = () => {
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
  };

  if (loadingProducts) {
    return (
      <Card style={getCardStyle()}>
        <CardHeader>
          <CardTitle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 24, minHeight: 40 }}>
              <Button
                variant="default"
                size="icon"
                onClick={() => router.push(`/customers/${id}`)}
                style={{ position: 'absolute', left: 0 }}
              >
                <FiArrowLeft className="text-lg" />
              </Button>
              <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
                Sipariş Ekle
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ padding: '32px 0' }}>
            {/* Skeleton loading rows for products */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse mb-2" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Head>
        <title>Sipariş Ekle</title>
      </Head>
      <Card style={getCardStyle()}>
        <CardHeader>
          <CardTitle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 24, minHeight: 40 }}>
              <Button
                variant="default"
                size="icon"
                onClick={() => router.push(`/customers/${id}`)}
                style={{ position: 'absolute', left: 0 }}
              >
                <FiArrowLeft className="text-lg" />
              </Button>
              <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
                Sipariş Ekle
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Çoklu ürün ve adet seçimi */}
              {form.watch("request.orderItems").length > 0 && (
                <div className="flex flex-col gap-4 mb-4">
                  {form.watch("request.orderItems").map((item, idx) => {
                    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
                    if (!isMobile) {
                      // Desktop: original unchanged layout
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f7fafd",
                            borderRadius: 12,
                            padding: "18px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            gap: 16,
                            position: "relative",
                          }}
                        >
                          {/* Stok uyarısı */}
                          {(() => {
                            const selectedProduct = products.find(
                              (p) => p.productId === item.productId
                            );
                            if (
                              selectedProduct &&
                              (!selectedProduct.stock || selectedProduct.stock === 0)
                            ) {
                              return (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 6,
                                    right: 12,
                                    color: "#e53e3e",
                                    fontWeight: 500,
                                    fontSize: 13,
                                    background: "#fff0f0",
                                    borderRadius: 6,
                                    padding: "2px 10px",
                                    zIndex: 2,
                                  }}
                                >
                                  Stok bilgisi yok!
                                </span>
                              );
                            }
                            return null;
                          })()}
                          <FormField
                            control={form.control}
                            name={`request.orderItems.${idx}.productId`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Ürün</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    className="border rounded-md px-3 py-2 w-full"
                                  >
                                    {products.map((product, i) => (
                                      <option key={i} value={product.productId}>
                                        {product.name} (
                                        {product.productTypeDisplayName})
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`request.orderItems.${idx}.quantity`}
                            render={({ field }) => (
                              <FormItem className="w-40 ml-4">
                                <FormLabel>Adet</FormLabel>
                                <FormControl>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 4,
                                    }}
                                  >
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      style={{ padding: 0, width: 32, height: 32 }}
                                      onClick={() =>
                                        field.onChange(
                                          Math.max(1, Number(field.value) - 1)
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    <Input
                                      {...field}
                                      type="number"
                                      min={1}
                                      style={{ textAlign: "center", width: 72 }}
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      style={{ padding: 0, width: 32, height: 32 }}
                                      onClick={() =>
                                        field.onChange(Number(field.value) + 1)
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            style={{
                              width: 36,
                              height: 36,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => {
                              const items = [...form.getValues("request.orderItems")];
                              items.splice(idx, 1);
                              form.setValue("request.orderItems", items);
                            }}
                            title="Ürünü kaldır"
                          >
                            ×
                          </Button>
                        </div>
                      );
                    }
                    // Mobile: stacked layout
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "block",
                          background: "#f7fafd",
                          borderRadius: 12,
                          padding: "12px 8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          position: "relative",
                          marginBottom: 8,
                        }}
                      >
                        {/* Stok uyarısı */}
                        {(() => {
                          const selectedProduct = products.find(
                            (p) => p.productId === item.productId
                          );
                          if (
                            selectedProduct &&
                            (!selectedProduct.stock || selectedProduct.stock === 0)
                          ) {
                            return (
                              <span
                                style={{
                                  position: "absolute",
                                  top: 6,
                                  right: 12,
                                  color: "#e53e3e",
                                  fontWeight: 500,
                                  fontSize: 13,
                                  background: "#fff0f0",
                                  borderRadius: 6,
                                  padding: "2px 10px",
                                  zIndex: 2,
                                }}
                              >
                                Stok bilgisi yok!
                              </span>
                            );
                          }
                          return null;
                        })()}
                        <div style={{ width: '100%' }}>
                          <FormField
                            control={form.control}
                            name={`request.orderItems.${idx}.productId`}
                            render={({ field }) => (
                              <FormItem className="flex-1" style={{ marginBottom: 8 }}>
                                <FormLabel>Ürün</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    className="border rounded-md px-3 py-2 w-full"
                                    style={{ fontSize: 16, minHeight: 44 }}
                                  >
                                    {products.map((product, i) => (
                                      <option key={i} value={product.productId}>
                                        {product.name} (
                                        {product.productTypeDisplayName})
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div style={{ width: '100%', marginTop: 8 }}>
                          <FormField
                            control={form.control}
                            name={`request.orderItems.${idx}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Adet</FormLabel>
                                <FormControl>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 4,
                                      width: '100%',
                                      justifyContent: 'center', // Center horizontally on mobile
                                    }}
                                  >
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      style={{ padding: 0, width: 40, height: 40 }}
                                      onClick={() =>
                                        field.onChange(
                                          Math.max(1, Number(field.value) - 1)
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    <Input
                                      {...field}
                                      type="number"
                                      min={1}
                                      style={{ textAlign: "center", width: 80, fontSize: 18, height: 40 }}
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      style={{ padding: 0, width: 40, height: 40 }}
                                      onClick={() =>
                                        field.onChange(Number(field.value) + 1)
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          style={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 8,
                          }}
                          onClick={() => {
                            const items = [...form.getValues("request.orderItems")];
                            items.splice(idx, 1);
                            form.setValue("request.orderItems", items);
                          }}
                          title="Ürünü kaldır"
                        >
                          ×
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
              <Button
                type="button"
                variant="default"
                size="lg"
                className="mb-2 font-bold text-base flex items-center justify-center gap-2"
                style={{
                  alignSelf: "flex-start",
                  minWidth: "120px",
                  width: "120px",
                  padding: "12px 0",
                }}
                disabled={form.watch("request.orderItems").some((item) => {
                  const selectedProduct = products.find(
                    (p) => p.productId === item.productId
                  );
                  return (
                    selectedProduct &&
                    (selectedProduct.stock == null ||
                      Number(selectedProduct.stock) <= 0)
                  );
                })}
                onClick={() =>
                  form.setValue("request.orderItems", [
                    { productId: products[0]?.productId || "", quantity: 1 },
                    ...form.getValues("request.orderItems"),
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
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={
                  form.watch("request.orderItems").length === 0 ||
                  !form.watch("request.totalPrice") ||
                  !form.watch("request.maintenanceDay") ||
                  Number(form.watch("request.totalPrice")) <= 0 ||
                  Number(form.watch("request.maintenanceDay")) <= 0 ||
                  form.watch("request.orderItems").some((item) => {
                    const selectedProduct = products.find(
                      (p) => p.productId === item.productId
                    );
                    return (
                      !selectedProduct ||
                      !selectedProduct.stock ||
                      selectedProduct.stock === 0
                    );
                  })
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
