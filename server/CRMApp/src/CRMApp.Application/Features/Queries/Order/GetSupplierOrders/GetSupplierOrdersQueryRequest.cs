using CRMApp.Application.Features.Dtos.Order;
using MediatR;

namespace CRMApp.Application.Features.Queries.Order.GetSupplierOrders
{
    public record GetSupplierOrdersQueryRequest(string SupplierId):IRequest<List<OrderDto>>;
}
