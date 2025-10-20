using CRMApp.Application.Features.Dtos.Item;
using MediatR;

namespace CRMApp.Application.Features.Commands.Maintenance.CreateOrderMaintenance
{
    public record CreateOrderMaintenanceRequest(string? OrderCode,string? CustomerId, decimal TotalPrice,string Description, int MaintenanceDay, List<CreateItemDto> MaintenanceItems) :IRequest<Guid>;
}
