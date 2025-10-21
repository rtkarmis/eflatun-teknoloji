using CRMApp.Application.Features.Dtos.Maintenance;
using MediatR;

namespace CRMApp.Application.Features.Queries.Maintenance.GetCustomerMaintenances
{
    public record GetCustomerMaintenancesQueryRequest(string CustomerId) : IRequest<List<MaintenanceDto>>;
}
