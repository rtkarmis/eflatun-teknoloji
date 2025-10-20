// Ortak tipler burada tanımlanabilir

export type User = {
  id: string;
  name: string;
  email: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
