import React from "react";
import useAuthService from "../../services/authService";
import { useAuthContext } from "../../lib/AuthProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ResultResponse } from "../../types/api";
import { AuthResponseDto } from "../../types/auth-dto";

export type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = React.useState("");
  const { login } = useAuthService();

  const onSubmit = async (values: LoginFormValues) => {
    setError("");
    const res: ResultResponse<AuthResponseDto> = await login(values);
    if (res.success && res.data?.accessToken) {
      // Sadece yönlendirme için redirectAfterLogin kullanılıyor
      const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      router.replace(redirectTo);
    } else {
      setError(res.message || "Giriş başarısız!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Kullanıcı Adı"
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Şifre"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="w-full">
            Giriş
          </Button>
        </form>
      </Form>
      {error && (
        <p style={{ color: "#ff0033", textAlign: "center" }}>{error}</p>
      )}
    </>
  );
};

export default LoginForm;
