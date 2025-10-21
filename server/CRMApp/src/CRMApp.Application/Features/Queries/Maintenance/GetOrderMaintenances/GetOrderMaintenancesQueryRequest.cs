using CRMApp.Application.Features.Dtos.Maintenance;
using MediatR;

namespace CRMApp.Application.Features.Queries.Maintenance.GetOrderMaintenances
{
    public record GetOrderMaintenancesQueryRequest(string OrderId):IRequest<List<MaintenanceDto>>;
}
