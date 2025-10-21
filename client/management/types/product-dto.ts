export enum ProductType {
  Device = 1,
  Filter = 2,
  Equipment = 3,
}

export interface ProductDto {
  productId: string;
  name: string;
  stock: number;
  productType: ProductType;
  productTypeDisplayName: string;
}

export interface CreateProductCommandRequest {
  name: string;
  productType: ProductType;
}

export interface UpdateProductCommandRequest {
  name: string;
  productType: ProductType;
}

export interface GetAllProductsQueryRequest {
  // Filtreleme, sıralama vs. eklenebilir
}

export interface GetProductByIdQueryRequest {
  productId: string;
}
