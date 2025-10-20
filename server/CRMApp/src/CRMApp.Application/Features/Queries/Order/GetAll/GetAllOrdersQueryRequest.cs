using CRMApp.Application.Features.Dtos.Order;
using MediatR;
using System.Collections.Generic;

namespace CRMApp.Application.Features.Queries.Order.GetAll
{
    public record GetAllOrdersQueryRequest() : IRequest<List<OrderDto>>;
}