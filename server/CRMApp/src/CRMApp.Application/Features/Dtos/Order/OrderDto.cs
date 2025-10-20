using CRMApp.Application.Features.Dtos.Item;
using CRMApp.Domain.Enums.Order;

namespace CRMApp.Application.Features.Dtos.Order
{
    public record OrderDto(string OrderCode, DateTime OrderDate, DateTime? MaintenanceDate, decimal Price, List<ItemDto> OrderItems);
}
