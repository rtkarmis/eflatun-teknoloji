using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Maintenance.CreateOrderMaintenance
{
    public class CreateOrderMaintenanceHandler : IRequestHandler<CreateOrderMaintenanceRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrderMaintenanceHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateOrderMaintenanceRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);
            var order = await _unitOfWork.Orders.GetSingleAsync(x => x.OrderCode == request.OrderCode);
            if (order == null) throw new OrderNotFoundException(request.OrderCode);
            List<Tuple<Domain.Entities.Product, int>> maintenanceItems = new List<Tuple<Domain.Entities.Product, int>>();
            foreach (var item in request.MaintenanceItems)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
                if (product == null) throw new ProductNotFoundException(item.ProductId);

                maintenanceItems.Add(new Tuple<Domain.Entities.Product, int>(product, item.Quantity));
            }
            var maintenance = order.AddMaintenance(customer,request.TotalPrice, request.Description,maintenanceItems);
            order.SetMaintenanceDate(request.MaintenanceDay);
            await _unitOfWork.Maintenances.AddAsync(maintenance);
            await _unitOfWork.SaveChangesAsync();
            return maintenance.Id;
        }
    }
}
