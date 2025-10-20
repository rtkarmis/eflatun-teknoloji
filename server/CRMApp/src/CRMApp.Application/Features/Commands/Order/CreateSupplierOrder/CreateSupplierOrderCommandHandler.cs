using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Order.CreateSupplierOrder
{
    public class CreateSupplierOrderCommandHandler : IRequestHandler<CreateSupplierOrderCommandRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateSupplierOrderCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSupplierOrderCommandRequest request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(request.SupplierId);
            if (supplier == null) throw new SupplierNotFoundException(request.SupplierId);
            List<Tuple<Domain.Entities.Product, int>> orderItems = new List<Tuple<Domain.Entities.Product, int>>();
            foreach (var item in request.OrderItems)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
                if (product == null) throw new ProductNotFoundException(item.ProductId);

                orderItems.Add(new Tuple<Domain.Entities.Product, int>(product, item.Quantity));
            }
            var order = supplier.AddOrder(request.TotalPrice, orderItems);
            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();
            return order.Id;
        }
    }
}
