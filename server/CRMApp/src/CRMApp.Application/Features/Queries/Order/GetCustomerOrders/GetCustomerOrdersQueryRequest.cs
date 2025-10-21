using CRMApp.Application.Features.Dtos.Order;
using MediatR;

namespace CRMApp.Application.Features.Queries.Order.GetCustomerOrders
{
    public record GetCustomerOrdersQueryRequest(string CustomerId):IRequest<List<OrderDto>>;
}
