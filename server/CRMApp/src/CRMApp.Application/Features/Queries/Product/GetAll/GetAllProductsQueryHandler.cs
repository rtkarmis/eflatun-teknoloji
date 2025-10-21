using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Product;
using MediatR;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Application.Features.Queries.Product.GetAll
{
    public class GetAllProductsQueryHandler
        : IRequestHandler<GetAllProductsQueryRequest, List<ProductDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllProductsQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ProductDto>> Handle(GetAllProductsQueryRequest request, CancellationToken cancellationToken)
        {
            var products = _unitOfWork.Products.GetWhere(x => x.Status == Domain.Enums.Common.Status.Active).ToList();

            return products.Select(s => new ProductDto(
               s.Id, s.Name, s.Stock, s.ProductType, s.ProductType.ToDisplayName()
            )).ToList();
        }
    }
}
