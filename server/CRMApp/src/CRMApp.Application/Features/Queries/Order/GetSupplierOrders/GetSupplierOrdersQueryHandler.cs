using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Item;
using CRMApp.Application.Features.Dtos.Order;
using CRMApp.Shared.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Application.Features.Queries.Order.GetSupplierOrders
{
    public class GetSupplierOrdersQueryHandler : IRequestHandler<GetSupplierOrdersQueryRequest, List<OrderDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSupplierOrdersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<OrderDto>> Handle(GetSupplierOrdersQueryRequest request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(request.SupplierId);
            if (supplier == null) throw new SupplierNotFoundException(request.SupplierId);

            // OrderItems ve Product'ı dahil et
            var ordersQuery = _unitOfWork.Orders.GetWhere(x => x.OwnerType == Domain.Enums.Order.OwnerType.Supplier
                                                    && x.SupplierId == Guid.Parse(request.SupplierId))
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
