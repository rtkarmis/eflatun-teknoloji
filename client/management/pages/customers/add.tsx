import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import useCustomerService from '@/services/customerService';
import { CreateCustomerCommandRequest } from '@/types/customer-dto';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';


type CustomerFormValues = {
  request:CreateCustomerCommandRequest
};

export default function AddCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<CustomerFormValues>({
    defaultValues: {
      request:{
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
    }},
  });
  const { createCustomer } = useCustomerService();

  const onSubmit = async (values: CustomerFormValues) => {
  await createCustomer(values.request);
  queryClient.invalidateQueries({ queryKey: ["customers"] });
  router.push('/customers');
  };

  return (
    <>
      <Head>
        <title>Müşteri Ekle</title>
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
              onClick={() => router.push('/customers')}
              style={{ position: 'absolute', left: 0 }}
            >
              <FiArrowLeft className="text-lg" />
            </Button>
            <h1 className="text-2xl font-bold text-primary" style={{ margin: 0, flex: 1, textAlign: 'center' }}>
              Müşteri Ekle
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="request.firstName"
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
              name="request.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyad</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Soyad" />
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
            <FormField
              control={form.control}
              name="request.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Adres" />
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
