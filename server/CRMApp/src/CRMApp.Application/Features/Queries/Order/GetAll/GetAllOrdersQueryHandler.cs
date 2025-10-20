using CRMApp.Application.Features.Dtos.Order;
using CRMApp.Application.Common.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace CRMApp.Application.Features.Queries.Order.GetAll
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQueryRequest, List<OrderDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllOrdersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<OrderDto>> Handle(GetAllOrdersQueryRequest request, CancellationToken cancellationToken)
        {
            var orders = _unitOfWork.Orders.GetAll();
            return orders.Select(y => new OrderDto(
                y.OrderCode,
                y.OrderDate,
                y.MaintenanceDate,
                y.Price,
                y.OrderItems.Select(z => new CRMApp.Application.Features.Dtos.Item.ItemDto(z.Product.Name, z.Quantity)).ToList()
            )).ToList();
        }
    }
}