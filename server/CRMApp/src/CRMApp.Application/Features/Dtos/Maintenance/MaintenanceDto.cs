using CRMApp.Application.Features.Dtos.Item;

namespace CRMApp.Application.Features.Dtos.Maintenance
{
    public record MaintenanceDto(string OrderCode, DateTime MaintenanceDate, decimal Price, string Description, List<ItemDto> MaintenanceItems);
}
