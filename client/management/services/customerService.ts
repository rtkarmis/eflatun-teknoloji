// Customer API çağrıları için örnek servis
// CustomerController endpointlerine göre mocklanmıştır

import useFetch from "../utils/httpClient";
import {
  CreateCustomerCommandRequest,
  UpdateCustomerCommandRequest,
  CustomerDto,
} from "../types/customer-dto";
import { CreateOrderMaintenanceRequest, MaintenanceDto } from "../types/maintenance-dto";
import { CreateCustomerOrderCommandRequest, OrderDto } from "../types/order-dto";

const useCustomerService = () => {
  const { get, post, put, deleted } = useFetch();

  // POST /api/customer => Guid
  const createCustomer = async (data: CreateCustomerCommandRequest) => {
    return await post<string>({ controller: "customer", data });
  };

  // POST /api/customer/{customerId}/order => Guid
  const createCustomerOrder = async (customerId: string, data: CreateCustomerOrderCommandRequest) => {
    return await post<string>({ controller: "customer", action: `${customerId}/order`, data });
  };

  // POST /api/customer/{customerId}/maintenance => Guid
  const createCustomerMaintenance = async (customerId: string, data: CreateOrderMaintenanceRequest) => {
    return await post<string>({ controller: "customer", action: `${customerId}/maintenance`, data });
  };

  // PUT /api/customer/{customerId} => bool
  const updateCustomer = async (customerId: string, data: UpdateCustomerCommandRequest) => {
    return await put<boolean>({ controller: "customer", action: customerId, data });
  };

  // DELETE /api/customer/{customerId} => bool
  const deleteCustomer = async (customerId: string) => {
    return await deleted<boolean>({ controller: "customer", action: customerId });
  };

  // GET /api/customer => List<CustomerDto>
  const getCustomers = async (params?: any) => {
    return await get<CustomerDto[]>({ controller: "customer", ...params });
  };

  // GET /api/customer/{customerId} => CustomerDto | null
  const getCustomerById = async (customerId: string) => {
    return await get<CustomerDto>({ controller: "customer", action: customerId });
  };

  // GET /api/customer/{customerId}/orders => List<OrderDto>
  const getCustomerOrders = async (customerId: string) => {
    return await get<OrderDto[]>({ controller: "customer", action: `${customerId}/orders` });
  };

  // GET /api/customer/{customerId}/maintenances => List<MaintenanceDto>
  const getCustomerMaintenances = async (customerId: string) => {
    return await get<MaintenanceDto[]>({ controller: "customer", action: `${customerId}/maintenances` });
  };

  // GET /api/customer/orders/{orderId}/maintenances => List<MaintenanceDto>
  const getOrderMaintenances = async (orderId: string) => {
    return await get<MaintenanceDto[]>({ controller: "customer", action: `orders/${orderId}/maintenances` });
  };

  return {
    createCustomer,
    createCustomerOrder,
    createCustomerMaintenance,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById,
    getCustomerOrders,
    getCustomerMaintenances,
    getOrderMaintenances,
  };
};

export default useCustomerService;
