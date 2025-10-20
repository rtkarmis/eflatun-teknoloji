import axios from "axios";
import { ResultResponse, mapResultResponse } from "../types/api";
import toast from 'react-hot-toast';
import { useAuthContext } from '../lib/AuthProvider';

const useFetch = () => {
  const { accessToken, setAccessToken, setUserName, isLoggingOut } = useAuthContext();

  const axiosInst = axios.create({});

  axiosInst.interceptors.request.use(
    (config) => {
      if (accessToken && config && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInst.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as any;
      // Logout işlemi sırasında veya sonrasında refreshToken çağrılmamalı
      if (isLoggingOut) {
        return Promise.reject(error);
      }
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/auth/refresh-token`,
            {},
            { withCredentials: true }
          );
          const data = refreshResponse.data as any;
          if (data?.success && data?.data?.accessToken) {
            setAccessToken(data.data.accessToken);
            if (setUserName && data.data.username) setUserName(data.data.username);
            originalRequest.headers["Authorization"] = `Bearer ${data.data.accessToken}`;
            return axiosInst.request(originalRequest);
          } else {
            toast.error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
            setAccessToken && setAccessToken(null);
            if (setUserName) setUserName(null);
          }
        } catch (refreshError) {
          toast.error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
          setAccessToken && setAccessToken(null);
          if (setUserName) setUserName(null);
        }
      }
      return Promise.reject(error);
    }
  );

  const post = async <T = any>(params: any, isFormData: boolean = false): Promise<ResultResponse<T>> => {
    const { controller, action, data, withCredentials } = params;
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/${controller}`;
    if (action) url += `/${action}`;
    try {
      const headers: any = {};
      if (isFormData) headers["Content-Type"] = "multipart/form-data";
      const response = await axiosInst.post(url, data, {
        headers,
        withCredentials: withCredentials ?? false
      });
      const mapped = mapResultResponse<T>(response.data);
      if (!mapped.success && mapped.message) toast.error(mapped.message);
      return mapped;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  const get = async <T = any>(params: any): Promise<ResultResponse<T>> => {
    const { controller, action, withCredentials } = params;
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/${controller}`;
    if (action) url += `/${action}`;
    try {
      const headers: any = {};
      const response = await axiosInst.get(url, {
        headers,
        withCredentials: withCredentials ?? false
      });
      const mapped = mapResultResponse<T>(response.data);
      if (!mapped.success && mapped.message) toast.error(mapped.message);
      return mapped;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  const put = async <T = any>(params: any): Promise<ResultResponse<T>> => {
    const { controller, action, data, withCredentials } = params;
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/${controller}`;
    if (action) url += `/${action}`;
    try {
      const headers: any = {};
      const response = await axiosInst.put(url, data, {
        headers,
        withCredentials: withCredentials ?? false
      });
      const mapped = mapResultResponse<T>(response.data);
      if (!mapped.success && mapped.message) toast.error(mapped.message);
      return mapped;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  const deleted = async <T = any>(params: any): Promise<ResultResponse<T>> => {
    const { controller, action, data, withCredentials } = params;
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/${controller}`;
    if (action) url += `/${action}`;
    try {
      const headers: any = {};
      const response = await axiosInst.delete(url, {
        params: data,
        headers,
        withCredentials: withCredentials ?? false
      });
      const mapped = mapResultResponse<T>(response.data);
      if (!mapped.success && mapped.message) toast.error(mapped.message);
      return mapped;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  return { post, get, put, deleted };
};

export default useFetch;