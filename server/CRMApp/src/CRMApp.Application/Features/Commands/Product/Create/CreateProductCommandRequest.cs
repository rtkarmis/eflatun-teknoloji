using MediatR;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Application.Features.Commands.Product.Create
{
    public record CreateProductCommandRequest(string Name, ProductType ProductType) : IRequest<Guid>;
}
