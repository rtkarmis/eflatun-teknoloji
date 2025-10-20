using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Product.Update
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommandRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateProductCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(UpdateProductCommandRequest request, CancellationToken cancellationToken)
        {

            var product = await _unitOfWork.Products.GetByIdAsync(request.ProductId);
            if (product == null) throw new ProductNotFoundException(request.ProductId);
            product.UpdateName(request.Name);
            product.UpdateProductType(request.ProductType);
            _unitOfWork.Products.Update(product);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
