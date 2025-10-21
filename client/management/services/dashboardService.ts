
import useFetch from "../utils/httpClient";
import {
  DashboardSummaryRequest,
  DashboardSummaryResponse,
  DashboardMaintenanceDto,
  DashboardCriticalStockProductDto,
  DashboardIncomeExpenseDto,
  DashboardProfitLossDto
} from "../types/dashboard-dto";

const useDashboardService = () => {
  const { post } = useFetch();

  // POST /api/dashboard/summary => DashboardSummaryResponse
  const getDashboardSummary = async () => {
    return await post<DashboardSummaryResponse>({ controller: "dashboard", action: "summary", data: {} });
  };

  return {
    getDashboardSummary,
  };
};

export default useDashboardService;
