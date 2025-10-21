using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Item;
using CRMApp.Application.Features.Dtos.Maintenance;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Queries.Maintenance.GetCustomerMaintenances
{
    public class GetCustomerMaintenancesQueryHandler : IRequestHandler<GetCustomerMaintenancesQueryRequest, List<MaintenanceDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCustomerMaintenancesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<MaintenanceDto>> Handle(GetCustomerMaintenancesQueryRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);

            var maintenances = _unitOfWork.Maintenances.GetWhere(x => x.CustomerId == customer.Id )
                                                        .Select(y => new MaintenanceDto(y.Order != null ? y.Order.OrderCode : null, y.MaintenanceDate, y.Price, y.Description, y.MaintenanceItems.Select(z => new ItemDto(z.Product.Name, z.Quantity)).ToList()))
                                                        .ToList();
            return maintenances;
        }
    }
}
