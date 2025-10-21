using CRMApp.Application.Features.Dtos.Item;
using MediatR;

namespace CRMApp.Application.Features.Commands.Order.CreateSupplierOrder
{
    public record CreateSupplierOrderCommandRequest(string? SupplierId, decimal TotalPrice, List<CreateItemDto> OrderItems):IRequest<Guid>;
}
