import useFetch from "../utils/httpClient";
import {
  SupplierDto,
  CreateSupplierCommandRequest,
  UpdateSupplierCommandRequest,
} from "../types/supplier-dto";
import { CreateSupplierOrderCommandRequest, OrderDto } from "../types/order-dto";

const useSupplierService = () => {
  const { get, post, put, deleted } = useFetch();

  // POST /api/supplier => Guid
  const createSupplier = async (data: CreateSupplierCommandRequest) => {
    return await post<string>({ controller: "supplier", data });
  };

  // POST /api/supplier/{SupplierId}/order => Guid
  const createSupplierOrder = async (supplierId: string, data: CreateSupplierOrderCommandRequest) => {
    return await post<string>({ controller: "supplier", action: `${supplierId}/order`, data });
  };

  // PUT /api/supplier/{SupplierId} => bool
  const updateSupplier = async (supplierId: string, data: UpdateSupplierCommandRequest) => {
    return await put<boolean>({ controller: "supplier", action: supplierId, data });
  };

  // DELETE /api/supplier/{SupplierId} => bool
  const deleteSupplier = async (supplierId: string) => {
    return await deleted<boolean>({ controller: "supplier", action: supplierId });
  };

  // GET /api/supplier => List<SupplierDto>
  const getSuppliers = async (params?: any) => {
    return await get<SupplierDto[]>({ controller: "supplier", ...params });
  };

  // GET /api/supplier/{SupplierId} => SupplierDto
  const getSupplierById = async (supplierId: string) => {
    return await get<SupplierDto>({ controller: "supplier", action: supplierId });
  };

  // GET /api/supplier/order/{SupplierId} => List<OrderDto>
  const getSupplierOrders = async (supplierId: string) => {
    return await get<OrderDto[]>({ controller: "supplier", action: `order/${supplierId}` });
  };

  return {
    createSupplier,
    createSupplierOrder,
    updateSupplier,
    deleteSupplier,
    getSuppliers,
    getSupplierById,
    getSupplierOrders,
  };
};

export default useSupplierService;
