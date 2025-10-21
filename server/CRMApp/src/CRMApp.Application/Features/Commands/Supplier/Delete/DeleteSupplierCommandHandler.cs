using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Delete
{
    public class DeleteSupplierCommandHandler
        : IRequestHandler<DeleteSupplierCommandRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSupplierCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteSupplierCommandRequest request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(request.SupplierId);
            if (supplier == null) throw new SupplierNotFoundException(request.SupplierId);
            supplier.SetPassive();
            _unitOfWork.Suppliers.Update(supplier);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }

}
