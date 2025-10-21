using MediatR;
using CRMApp.Application.Features.Dtos.Supplier;
using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;

namespace CRMApp.Application.Features.Queries.Supplier.GetById
{
    public class GetSupplierByIdQueryHandler
        : IRequestHandler<GetSupplierByIdQueryRequest, SupplierDto?>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSupplierByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<SupplierDto?> Handle(GetSupplierByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(request.SupplierId);
            if (supplier == null) throw new SupplierNotFoundException(request.SupplierId);

            return new SupplierDto(
                supplier.Id,supplier.Name, supplier.Email, supplier.PhoneNumber
            );
        }
    }

}
