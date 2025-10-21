import { CreateItemDto, ItemDto } from "./item-dto";

export interface MaintenanceDto {
  orderCode: string;
  maintenanceDate: string;
  price: number;
  description: string;
  maintenanceItems: ItemDto[];
}
export interface CreateOrderMaintenanceRequest {
  orderCode: string;
  totalPrice: number;
  description: string;
  maintenanceDay: number;
  maintenanceItems: CreateItemDto[];
}