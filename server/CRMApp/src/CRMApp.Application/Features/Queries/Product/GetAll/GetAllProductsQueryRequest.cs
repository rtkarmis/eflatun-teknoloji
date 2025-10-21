using CRMApp.Application.Features.Dtos.Product;
using MediatR;

namespace CRMApp.Application.Features.Queries.Product.GetAll
{
    public record GetAllProductsQueryRequest
        : IRequest<List<ProductDto>>;
}
