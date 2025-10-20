using CRMApp.Application.Features.Dtos.Dashboard;
using CRMApp.Application.Common.Interfaces;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CRMApp.Application.Features.Queries.Dashboard
{
    public class GetDashboardSummaryQueryHandler : IRequestHandler<GetDashboardSummaryQueryRequest, DashboardSummaryResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetDashboardSummaryQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<DashboardSummaryResponse> Handle(GetDashboardSummaryQueryRequest query, CancellationToken cancellationToken)
        {
            // Products
            var products = _unitOfWork.Products.GetAll().ToList();
            var criticalStockProducts = products.Where(p => p.Stock <= 2)
                .Select(p => new DashboardCriticalStockProductDto(p.Id, p.Name, p.Stock))
                .ToList();

            // Customers
            var customers = _unitOfWork.Customers.GetWhere(x => x.Status == CRMApp.Domain.Enums.Common.Status.Active).ToList();
            var totalActiveCustomers = customers.Count;

            // Orders (with items)
            var allOrders = _unitOfWork.Orders.GetAllWithItems().ToList();

            // Maintenances (with items)
            var allMaintenancesQuery = _unitOfWork.Maintenances.GetAllWithItems();
            var allMaintenances = allMaintenancesQuery == null ? new List<CRMApp.Domain.Entities.Maintenance>() : allMaintenancesQuery.ToList();

            var today = DateTime.Today;

            var upcomingMaintenances = allOrders
                .Where(o => o.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer && o.MaintenanceDate != null && (o.MaintenanceDate.Value - today).TotalDays >= 0 && (o.MaintenanceDate.Value - today).TotalDays <= 7)
                .Select(o => {
                    var customer = customers.FirstOrDefault(c => c.Id == (o.CustomerId ?? Guid.Empty));
                    var customerName = customer != null ? $"{customer.FirstName} {customer.LastName}".Trim() : "";
                    var orderItem = o.OrderItems.FirstOrDefault();
                    var productName = (orderItem != null && orderItem.Product != null) ? orderItem.Product.Name : "";
                    var date = o.MaintenanceDate != null ? o.MaintenanceDate.Value.ToString("yyyy-MM-dd") : "";
                    var customerId = o.CustomerId.HasValue ? o.CustomerId.Value.ToString() : string.Empty;
                    var orderCode = o.OrderCode ?? string.Empty;
                    return new DashboardMaintenanceDto(customerName, productName, date, customerId, orderCode);
                })
                .ToList();

            var overdueMaintenances = allOrders
                .Where(o => o.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer && o.MaintenanceDate != null && o.MaintenanceDate.Value < today)
                .Select(o => {
                    var customer = customers.FirstOrDefault(c => c.Id == (o.CustomerId ?? Guid.Empty));
                    var customerName = customer != null ? ($"{customer.FirstName} {customer.LastName}").Trim() : "";
                    var orderItem = o.OrderItems.FirstOrDefault();
                    var productName = (orderItem != null && orderItem.Product != null) ? orderItem.Product.Name : "";
                    var date = o.MaintenanceDate != null ? o.MaintenanceDate.Value.ToString("yyyy-MM-dd") : "";
                    var customerId = o.CustomerId.HasValue ? o.CustomerId.Value.ToString() : string.Empty;
                    var orderCode = o.OrderCode ?? string.Empty;
                    return new DashboardMaintenanceDto(customerName, productName, date, customerId, orderCode);
                })
                .ToList();

            var totalOrderIncome = allOrders.Where(o => o.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer).Sum(o => o.Price);
            var totalMaintenanceIncome = allMaintenances.Sum(m => m.Price);
            var totalIncome = totalOrderIncome + totalMaintenanceIncome;
            var totalExpense = allOrders.Where(o => o.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Supplier).Sum(o => o.Price);

            var monthlyIncomeExpense = allOrders
                .GroupBy(o => o.OrderDate.ToString("yyyy-MM"))
                .Select(g => new DashboardIncomeExpenseDto(
                    g.Key,
                    g.Where(x => x.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer).Sum(x => x.Price) + allMaintenances.Where(m => m.MaintenanceDate.ToString("yyyy-MM") == g.Key).Sum(m => m.Price),
                    g.Where(x => x.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Supplier).Sum(x => x.Price)
                ))
                .ToList();

            var yearlyIncomeExpense = allOrders
                .GroupBy(o => o.OrderDate.Year)
                .Select(g => new DashboardIncomeExpenseDto(
                    g.Key.ToString(),
                    g.Where(x => x.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer).Sum(x => x.Price) + allMaintenances.Where(m => m.MaintenanceDate.Year == g.Key).Sum(m => m.Price),
                    g.Where(x => x.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Supplier).Sum(x => x.Price)
                ))
                .ToList();

            var profitLoss = new DashboardProfitLossDto(totalIncome, totalExpense);

            return Task.FromResult(new DashboardSummaryResponse(
                upcomingMaintenances,
                overdueMaintenances,
                criticalStockProducts,
                monthlyIncomeExpense,
                yearlyIncomeExpense,
                totalActiveCustomers,
                profitLoss
            ));
        }
    }
}
