using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Item;
using CRMApp.Application.Features.Dtos.Maintenance;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Queries.Maintenance.GetOrderMaintenances
{
    public class GetOrderMaintenancesQueryHandler : IRequestHandler<GetOrderMaintenancesQueryRequest, List<MaintenanceDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetOrderMaintenancesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<MaintenanceDto>> Handle(GetOrderMaintenancesQueryRequest request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.Orders.GetByIdAsync(request.OrderId);
            if (order == null) throw new OrderNotFoundException(request.OrderId);

            var maintenances = _unitOfWork.Maintenances.GetWhere(x => x.OrderId == order.Id)
                                                        .Select(y => new MaintenanceDto(y.Order != null ? y.Order.OrderCode : null, y.MaintenanceDate, y.Price, y.Description, y.MaintenanceItems.Select(z => new ItemDto(z.Product.Name, z.Quantity)).ToList()))
                                                        .ToList();
            return maintenances;
        }
    }
}
