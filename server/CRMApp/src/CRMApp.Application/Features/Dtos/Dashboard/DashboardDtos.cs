using System;
using System.Collections.Generic;

namespace CRMApp.Application.Features.Dtos.Dashboard
{
    public record DashboardSummaryResponse(
        List<DashboardMaintenanceDto> UpcomingMaintenances,
        List<DashboardMaintenanceDto> OverdueMaintenances,
        List<DashboardCriticalStockProductDto> CriticalStockProducts,
        List<DashboardIncomeExpenseDto> MonthlyIncomeExpense,
        List<DashboardIncomeExpenseDto> YearlyIncomeExpense,
        int TotalActiveCustomers,
        DashboardProfitLossDto ProfitLoss
    );

    public record DashboardMaintenanceDto(string Customer, string ProductName, string Date, string CustomerId, string OrderCode);
    public record DashboardCriticalStockProductDto(Guid Id, string Name, int Stock);
    public record DashboardIncomeExpenseDto(string Month, decimal Gelir, decimal Gider);
    public record DashboardProfitLossDto(decimal Profit, decimal Loss);
}
