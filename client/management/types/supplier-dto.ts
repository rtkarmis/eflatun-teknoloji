export interface SupplierDto {
  supplierId: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface CreateSupplierCommandRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateSupplierCommandRequest {
  supplierId: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface GetAllSuppliersQueryRequest {
  // Filtreleme, sıralama vs. eklenebilir
}
