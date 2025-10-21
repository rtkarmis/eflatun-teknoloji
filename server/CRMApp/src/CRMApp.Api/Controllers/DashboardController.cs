using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using CRMApp.Application.Features.Queries.Product.GetAll;
using CRMApp.Application.Features.Queries.Customer.GetAll;
using CRMApp.Application.Features.Dtos.Dashboard;
using CRMApp.Application.Features.Queries.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DashboardController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DashboardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST /api/dashboard/summary
        [HttpPost("summary")]
        public async Task<DashboardSummaryResponse> GetDashboardSummary([FromQuery] GetDashboardSummaryQueryRequest request)
        {
            return await _mediator.Send(request);
        }
    }
}
