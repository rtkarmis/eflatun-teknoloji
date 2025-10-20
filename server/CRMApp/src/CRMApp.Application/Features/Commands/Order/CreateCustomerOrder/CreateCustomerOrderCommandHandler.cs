using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Order.CreateCustomerOrder
{
    public class CreateCustomerOrderCommandHandler : IRequestHandler<CreateCustomerOrderCommandRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateCustomerOrderCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateCustomerOrderCommandRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);
            List<Tuple<Domain.Entities.Product, int>> orderItems = new List<Tuple<Domain.Entities.Product, int>>();
            foreach (var item in request.OrderItems)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
                if (product == null) throw new ProductNotFoundException(item.ProductId);

                orderItems.Add(new Tuple<Domain.Entities.Product, int>(product, item.Quantity));
            }
            var order = customer.AddOrder(request.TotalPrice,request.MaintenanceDay, orderItems);
            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();
            return order.Id;
        }
    }
}
