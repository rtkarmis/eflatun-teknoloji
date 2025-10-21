using MediatR;
using CRMApp.Application.Features.Dtos.Product;
using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Application.Features.Queries.Product.GetById
{
    public class GetProductByIdQueryHandler
        : IRequestHandler<GetProductByIdQueryRequest, ProductDto?>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ProductDto?> Handle(GetProductByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(request.ProductId);
            if (product == null) throw new SupplierNotFoundException(request.ProductId);

            return new ProductDto(
                product.Id,product.Name, product.Stock, product.ProductType, product.ProductType.ToDisplayName()
            );
        }
    }
}
