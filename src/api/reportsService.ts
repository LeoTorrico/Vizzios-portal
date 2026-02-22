import { adminClient } from "../api/adminClient";

export const reportsService = {
  getWeekly: async (carnet: string, date: string, branchId?: string) => {
    const params: any = { employeeCarnet: carnet, weekStartDate: date };
    if (branchId) params.branchId = branchId;

    const res = await adminClient.get("/reports/weekly", { params });
    return res.data;
  },

  getMonthly: async (year: number, month: number, branchId?: string) => {
    const params: any = { year, month };
    if (branchId) params.branchId = branchId;

    const res = await adminClient.get("/reports/monthly", { params });
    return res.data;
  },
};
