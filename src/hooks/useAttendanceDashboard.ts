import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "../api/attendanceService";

interface DashboardFilters {
  branchId?: string;
  employeeCarnet?: string;
  startDate?: string;
  endDate?: string;
}

export const useAttendanceDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    lastPage: 1,
  });

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { page, limit: 20, ...filters };

      const response = await attendanceService.getDashboard(params);

      if (response.data && Array.isArray(response.data)) {
        setData(response.data);
        setMeta({
          total: response.meta.total,
          page: Number(response.meta.page),
          limit: Number(response.meta.limit),
          lastPage: response.meta.lastPage,
        });
      } else {
        setData([]);
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar el reporte");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const applyFilters = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const nextPage = () => {
    if (meta.page < meta.lastPage) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (meta.page > 1) setPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= meta.lastPage) {
      setPage(pageNumber);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    applyFilters,
    filters,
  };
};
