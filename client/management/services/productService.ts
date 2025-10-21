import useFetch from "../utils/httpClient";
import { ProductDto, CreateProductCommandRequest, UpdateProductCommandRequest } from "../types/product-dto";

const useProductService = () => {
  const { get, post, put, deleted } = useFetch();


  // POST /api/product => Guid
  const createProduct = async (data: CreateProductCommandRequest) => {
    // Backend expects CreateProductCommandRequest in body
    return await post<string>({ controller: "product", data });
  };

  // PUT /api/product/{ProductId} => bool
  const updateProduct = async (productId: string, data: UpdateProductCommandRequest) => {
    // Backend expects ProductId as route param, and UpdateProductCommandRequest in body
    return await put<boolean>({ controller: "product", action: productId, data });
  };

  // DELETE /api/product/{ProductId} => bool
  const deleteProduct = async (productId: string) => {
    return await deleted<boolean>({ controller: "product", action: productId });
  };

  // GET /api/product => List<ProductDto>
  const getProducts = async (params?: any) => {
    // params can be GetAllProductsQueryRequest
    return await get<ProductDto[]>({ controller: "product", ...params });
  };

  // GET /api/product/{ProductId} => ProductDto | null
  const getProductById = async (productId: string) => {
    return await get<ProductDto>({ controller: "product", action: productId });
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
  };
};

export default useProductService;
