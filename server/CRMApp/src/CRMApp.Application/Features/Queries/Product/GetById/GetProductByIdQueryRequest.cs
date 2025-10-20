using CRMApp.Application.Features.Dtos.Product;
using MediatR;

namespace CRMApp.Application.Features.Queries.Product.GetById
{
    public record GetProductByIdQueryRequest(string ProductId)
        : IRequest<ProductDto?>;
}
