export interface DashboardSummaryRequest {}

export interface DashboardMaintenanceDto {
  customer: string;
  productName: string;
  date: string;
  customerId: string;
  orderCode: string;
}

export interface DashboardCriticalStockProductDto {
  id: string;
  name: string;
  stock: number;
}

export interface DashboardIncomeExpenseDto {
  month: string;
  gelir: number;
  gider: number;
}

export interface DashboardProfitLossDto {
  profit: number;
  loss: number;
}

export interface DashboardSummaryResponse {
  upcomingMaintenances: DashboardMaintenanceDto[];
  overdueMaintenances: DashboardMaintenanceDto[];
  criticalStockProducts: DashboardCriticalStockProductDto[];
  monthlyIncomeExpense: DashboardIncomeExpenseDto[];
  yearlyIncomeExpense: DashboardIncomeExpenseDto[];
  totalActiveCustomers: number;
  profitLoss: DashboardProfitLossDto;
}
