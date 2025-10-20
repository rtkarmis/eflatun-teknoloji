import { CreateItemDto, ItemDto } from "./item-dto";

export interface OrderDto {
  orderCode: string;
  orderDate: string;
  maintenanceDate: string;
  price: number;
  orderItems: ItemDto[];
}
export interface CreateCustomerOrderCommandRequest {
  totalPrice: number;
  maintenanceDay: number;
  orderItems: CreateItemDto[];
}

export interface CreateSupplierOrderCommandRequest {
  supplierId: string;
  totalPrice: number;
  orderItems: CreateItemDto[];
}