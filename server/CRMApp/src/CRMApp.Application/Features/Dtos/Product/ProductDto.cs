using System;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Application.Features.Dtos.Product
{
    public record ProductDto(Guid ProductId,string Name, int Stock, ProductType ProductType, string ProductTypeDisplayName);
}
