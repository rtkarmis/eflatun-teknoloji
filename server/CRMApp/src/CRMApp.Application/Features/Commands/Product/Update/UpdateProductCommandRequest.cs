using MediatR;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Application.Features.Commands.Product.Update
{
    public record UpdateProductCommandRequest(string? ProductId, string Name, ProductType ProductType) : IRequest<bool>;
}
