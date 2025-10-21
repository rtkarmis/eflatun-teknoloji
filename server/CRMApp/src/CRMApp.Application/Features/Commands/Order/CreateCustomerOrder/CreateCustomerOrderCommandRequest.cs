using CRMApp.Application.Features.Dtos.Item;
using MediatR;

namespace CRMApp.Application.Features.Commands.Order.CreateCustomerOrder
{
    public record CreateCustomerOrderCommandRequest(string? CustomerId,decimal TotalPrice, int MaintenanceDay, List<CreateItemDto> OrderItems):IRequest<Guid>;
}
