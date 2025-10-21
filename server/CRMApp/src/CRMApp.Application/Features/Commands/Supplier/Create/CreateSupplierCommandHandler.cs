using CRMApp.Application.Common.Interfaces;
using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Create
{
    public class CreateSupplierCommandHandler
        : IRequestHandler<CreateSupplierCommandRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateSupplierCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSupplierCommandRequest request, CancellationToken cancellationToken)
        {
            var supplier = new Domain.Entities.Supplier(request.Name, request.Email, request.PhoneNumber);

            await _unitOfWork.Suppliers.AddAsync(supplier);
            await _unitOfWork.SaveChangesAsync();

            return supplier.Id;
        }
    }

}
