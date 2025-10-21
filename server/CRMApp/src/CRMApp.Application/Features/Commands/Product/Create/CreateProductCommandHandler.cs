using CRMApp.Application.Common.Interfaces;
using MediatR;

namespace CRMApp.Application.Features.Commands.Product.Create
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateProductCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {
            var product = new Domain.Entities.Product(request.Name, request.ProductType);
            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return product.Id;
        }
    }
}
