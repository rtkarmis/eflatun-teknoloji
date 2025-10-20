// Ortak response wrapper tipi
export type ResultResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: string[] | null;
};

export function mapResultResponse<T>(apiResponse: any): ResultResponse<T> {
  return {
    success: apiResponse.Success ?? apiResponse.success,
    message: apiResponse.Message ?? apiResponse.message,
    data: apiResponse.Data ?? apiResponse.data,
    errors: apiResponse.Errors ?? apiResponse.errors,
  };
}