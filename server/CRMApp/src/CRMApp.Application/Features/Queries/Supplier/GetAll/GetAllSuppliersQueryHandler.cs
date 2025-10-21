using MediatR;
using CRMApp.Application.Features.Dtos.Supplier;
using CRMApp.Application.Common.Interfaces;

namespace CRMApp.Application.Features.Queries.Supplier.GetAll
{
    public class GetAllSuppliersQueryHandler
        : IRequestHandler<GetAllSuppliersQueryRequest, List<SupplierDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllSuppliersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<SupplierDto>> Handle(GetAllSuppliersQueryRequest request, CancellationToken cancellationToken)
        {
            var suppliers = _unitOfWork.Suppliers.GetWhere(x => x.Status == Domain.Enums.Common.Status.Active).ToList();

            return suppliers.Select(s => new SupplierDto(
                s.Id,s.Name, s.Email, s.PhoneNumber
            )).ToList();
        }
    }
}
