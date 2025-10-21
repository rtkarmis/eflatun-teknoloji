using CRMApp.Application.Features.Dtos.Maintenance;
using CRMApp.Application.Common.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace CRMApp.Application.Features.Queries.Maintenance.GetAll
{
    public class GetAllMaintenancesQueryHandler : IRequestHandler<GetAllMaintenancesQueryRequest, List<MaintenanceDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllMaintenancesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<MaintenanceDto>> Handle(GetAllMaintenancesQueryRequest request, CancellationToken cancellationToken)
        {
            var maintenances = _unitOfWork.Maintenances.GetAll();
            return maintenances.Select(y => new MaintenanceDto(
                y.Order != null ? y.Order.OrderCode : null,
                y.MaintenanceDate,
                y.Price,
                y.Description,
                y.MaintenanceItems.Select(z => new CRMApp.Application.Features.Dtos.Item.ItemDto(z.Product.Name, z.Quantity)).ToList()
            )).ToList();
        }
    }
}