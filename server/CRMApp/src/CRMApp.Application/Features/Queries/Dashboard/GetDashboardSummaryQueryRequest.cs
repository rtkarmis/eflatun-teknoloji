using CRMApp.Application.Features.Dtos.Dashboard;
using MediatR;

namespace CRMApp.Application.Features.Queries.Dashboard
{
    public record GetDashboardSummaryQueryRequest() : IRequest<DashboardSummaryResponse>;
}
