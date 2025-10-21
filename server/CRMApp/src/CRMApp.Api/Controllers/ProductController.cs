using CRMApp.Application.Features.Commands.Product.Create;
using CRMApp.Application.Features.Commands.Product.Delete;
using CRMApp.Application.Features.Commands.Product.Update;
using CRMApp.Application.Features.Dtos.Product;
using CRMApp.Application.Features.Queries.Product.GetAll;
using CRMApp.Application.Features.Queries.Product.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<Guid> Create([FromBody] CreateProductCommandRequest request)
        {
            return await _mediator.Send(request);
        }
        [HttpPut("{ProductId}")]
        public async Task<bool> Update([FromRoute] Guid ProductId, [FromBody] UpdateProductCommandRequest request)
        {
            var newRequest = new UpdateProductCommandRequest(
                ProductId.ToString(),
                request.Name,
                request.ProductType
            );
            return await _mediator.Send(newRequest);
        }

        [HttpDelete("{ProductId}")]
        public async Task<bool> Delete([FromRoute] Guid ProductId)
        {
            var request = new DeleteProductCommandRequest(ProductId.ToString());
            return await _mediator.Send(request);
        }

        [HttpGet]
        public async Task<List<ProductDto>> Get([FromQuery] GetAllProductsQueryRequest request)
        {
            return await _mediator.Send(request);
        }

        [HttpGet("{ProductId}")]
        public async Task<ProductDto?> Get([FromRoute] Guid ProductId)
        {
            var request = new GetProductByIdQueryRequest(ProductId.ToString());
            return await _mediator.Send(request);
        }
    }
}
