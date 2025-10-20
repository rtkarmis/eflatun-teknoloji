using System.Linq;
using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Item;
using CRMApp.Application.Features.Dtos.Order;
using CRMApp.Shared.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Application.Features.Queries.Order.GetCustomerOrders
{
    public class GetCustomerOrdersQueryHandler : IRequestHandler<GetCustomerOrdersQueryRequest, List<OrderDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCustomerOrdersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<OrderDto>> Handle(GetCustomerOrdersQueryRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);

            // OrderItems ve Product'ı dahil et
            var ordersQuery = _unitOfWork.Orders.GetWhere(x => x.OwnerType == Domain.Enums.Order.OwnerType.Customer
                                                    && x.CustomerId == Guid.Parse(request.CustomerId))
                                                .Include(x => x.OrderItems)
                                                .ThenInclude(oi => oi.Product);

            var ordersList = await ordersQuery.ToListAsync(cancellationToken);

            var orders = ordersList.Select(y => new OrderDto(
                y.OrderCode,
                y.OrderDate,
                y.MaintenanceDate,
                y.Price,
                y.OrderItems.Select(z => new ItemDto(z.Product.Name, z.Quantity)).ToList()
            )).ToList();
            return orders;
        }
    }
}
