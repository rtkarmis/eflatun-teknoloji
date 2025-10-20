using CRMApp.Application.Features.Commands.Customer.Update;
using CRMApp.Application.Features.Commands.Order.CreateCustomerOrder;
using CRMApp.Application.Features.Commands.Order.CreateSupplierOrder;
using CRMApp.Application.Features.Commands.Supplier.Create;
using CRMApp.Application.Features.Commands.Supplier.Delete;
using CRMApp.Application.Features.Commands.Supplier.Update;
using CRMApp.Application.Features.Dtos.Order;
using CRMApp.Application.Features.Dtos.Supplier;
using CRMApp.Application.Features.Queries.Order.GetSupplierOrders;
using CRMApp.Application.Features.Queries.Supplier.GetAll;
using CRMApp.Application.Features.Queries.Supplier.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SupplierController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SupplierController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<Guid> Create([FromBody] CreateSupplierCommandRequest request)
        {
            return await _mediator.Send(request);
        }

        [HttpPost("{SupplierId}/order")]
        public async Task<Guid> CreateSupplierOrder([FromRoute] string SupplierId, [FromBody] CreateSupplierOrderCommandRequest request)
        {
            var newRequest = new CreateSupplierOrderCommandRequest(
                SupplierId,
                request.TotalPrice,
                request.OrderItems
            );
            return await _mediator.Send(newRequest);
        }

        [HttpPut("{SupplierId}")]
        public async Task<bool> Update([FromRoute] string SupplierId, [FromBody] UpdateSupplierCommandRequest request)
        {
            var newRequest = new UpdateSupplierCommandRequest(
                SupplierId,
                request.Name,
                request.Email,
                request.PhoneNumber
            );
            return await _mediator.Send(newRequest);
        }

        [HttpDelete("{SupplierId}")]
        public async Task<bool> Delete([FromRoute] string SupplierId)
        {
            var request = new DeleteSupplierCommandRequest(SupplierId);
            return await _mediator.Send(request);
        }

        [HttpGet]
        public async Task<List<SupplierDto>> Get([FromQuery] GetAllSuppliersQueryRequest request)
        {
            return await _mediator.Send(request);
        }

        [HttpGet("{SupplierId}")]
        public async Task<SupplierDto> Get([FromRoute] string SupplierId)
        {
            var request = new GetSupplierByIdQueryRequest(SupplierId);
            return await _mediator.Send(request);
        }

        [HttpGet("order/{SupplierId}")]
        public async Task<List<OrderDto>> GetSupplierOrders([FromRoute] string SupplierId)
        {
            var request = new GetSupplierOrdersQueryRequest(SupplierId);
            return await _mediator.Send(request);
        }
    }
}
