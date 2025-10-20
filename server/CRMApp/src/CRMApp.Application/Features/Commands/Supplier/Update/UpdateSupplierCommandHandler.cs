using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Update
{
    public class UpdateSupplierCommandHandler
        : IRequestHandler<UpdateSupplierCommandRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateSupplierCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(UpdateSupplierCommandRequest request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(request.SupplierId);
            if (supplier == null) throw new SupplierNotFoundException(request.SupplierId);

            supplier.Update(request.Name, request.Email, request.PhoneNumber);

            _unitOfWork.Suppliers.Update(supplier);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }

}
