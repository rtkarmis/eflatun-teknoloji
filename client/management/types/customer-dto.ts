export interface CustomerDto {
  customerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

// Command & Query input types for CustomerController endpoints
export interface CreateCustomerCommandRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateCustomerCommandRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface GetAllCustomersQueryRequest {
  // Filtreleme, sıralama vs. eklenebilir
}
