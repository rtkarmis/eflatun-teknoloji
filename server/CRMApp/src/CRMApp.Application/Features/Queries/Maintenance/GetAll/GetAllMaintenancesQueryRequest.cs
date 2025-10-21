using CRMApp.Application.Features.Dtos.Maintenance;
using MediatR;
using System.Collections.Generic;

namespace CRMApp.Application.Features.Queries.Maintenance.GetAll
{
    public record GetAllMaintenancesQueryRequest() : IRequest<List<MaintenanceDto>>;
}