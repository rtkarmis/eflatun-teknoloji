using CRMApp.Application.Features.Commands.Customer.Create;
using CRMApp.Application.Features.Commands.Customer.Delete;
using CRMApp.Application.Features.Commands.Customer.Update;
using CRMApp.Application.Features.Commands.Maintenance.CreateOrderMaintenance;
using CRMApp.Application.Features.Commands.Order.CreateCustomerOrder;
using CRMApp.Application.Features.Dtos.Customer;
using CRMApp.Application.Features.Dtos.Maintenance;
using CRMApp.Application.Features.Dtos.Order;
using CRMApp.Application.Features.Queries.Customer.GetAll;
using CRMApp.Application.Features.Queries.Customer.GetById;
using CRMApp.Application.Features.Queries.Maintenance.GetCustomerMaintenances;
using CRMApp.Application.Features.Queries.Maintenance.GetOrderMaintenances;
using CRMApp.Application.Features.Queries.Order.GetCustomerOrders;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST /api/customer
        [HttpPost]
        public async Task<Guid> Create([FromBody] CreateCustomerCommandRequest request)
        {
            return await _mediator.Send(request);
        }

        // POST /api/customer/{customerId}/orders
        [HttpPost("{CustomerId}/order")]
        public async Task<Guid> CreateCustomerOrder([FromRoute] string CustomerId, [FromBody] CreateCustomerOrderCommandRequest request)
        {
            var newRequest = new CreateCustomerOrderCommandRequest(
                CustomerId,
                request.TotalPrice,
                request.MaintenanceDay,
                request.OrderItems
            );
            return await _mediator.Send(newRequest);
        }

        // POST /api/customer/{customerId}/maintenances
        [HttpPost("{CustomerId}/maintenance")]
        public async Task<Guid> CreateCustomerMaintenance([FromRoute] string CustomerId, [FromBody] CreateOrderMaintenanceRequest request)
        {
            var newRequest = new CreateOrderMaintenanceRequest(
                request.OrderCode,
                CustomerId,
                request.TotalPrice,
                request.Description,
                request.MaintenanceDay,
                request.MaintenanceItems
            );
            return await _mediator.Send(newRequest);
        }

        // PUT /api/customer/{customerId}
        [HttpPut("{CustomerId}")]
        public async Task<bool> Update([FromRoute] string CustomerId, [FromBody] UpdateCustomerCommandRequest request)
        {
            var newRequest = new UpdateCustomerCommandRequest(
                CustomerId,
                request.FirstName,
                request.LastName,
                request.Email,
                request.PhoneNumber,
                request.Address
            );
            return await _mediator.Send(newRequest);
        }

        // DELETE /api/customer/{customerId}
        [HttpDelete("{CustomerId}")]
        public async Task<bool> Delete([FromRoute] string CustomerId)
        {
            var request = new DeleteCustomerCommandRequest(CustomerId);
            return await _mediator.Send(request);
        }

        // GET /api/customer
        [HttpGet]
        public async Task<List<CustomerDto>> Get([FromQuery] GetAllCustomersQueryRequest request)
        {
            return await _mediator.Send(request);
        }

        // GET /api/customer/{customerId}
        [HttpGet("{CustomerId}")]
        public async Task<CustomerDto?> Get([FromRoute] string CustomerId)
        {
            var request = new GetCustomerByIdQueryRequest(CustomerId);
            return await _mediator.Send(request);
        }

        // GET /api/customer/{customerId}/orders
        [HttpGet("{CustomerId}/orders")]
        public async Task<List<OrderDto>> GetCustomerOrders([FromRoute] GetCustomerOrdersQueryRequest request)
        {
            return await _mediator.Send(request);
        }

        // GET /api/customer/{customerId}/maintenances
        [HttpGet("{CustomerId}/maintenances")]
        public async Task<List<MaintenanceDto>> GetCustomerMaintenances([FromRoute] GetCustomerMaintenancesQueryRequest request)
        {
            return await _mediator.Send(request);
        }

        // GET /api/customer/orders/{orderId}/maintenances
        [HttpGet("orders/{OrderId}/maintenances")]
        public async Task<List<MaintenanceDto>> GetOrderMaintenances([FromRoute] GetOrderMaintenancesQueryRequest request)
        {
            return await _mediator.Send(request);
        }
    }
}
