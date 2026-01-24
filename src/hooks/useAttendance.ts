import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "../api/attendanceService";
import type { AttendanceDTO } from "../types";

// Asegúrate de importar o definir la interfaz PaginatedResponse aquí o en types
interface PaginatedResponse {
  data: any[];
  meta: {
    total: number;
    page: number | string;
    lastPage: number;
    limit: number | string;
  };
}

export const useAttendance = () => {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    lastPage: 1,
  });

  // --- NUEVO: Estado para el filtro de sucursal ---
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");

  const [page, setPage] = useState(1);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = useCallback(async () => {
    setLoadingFetch(true);
    setError(null);
    try {
      // --- MODIFICADO: Enviamos el branchId al servicio ---
      const params: any = { page, limit: 10 };
      if (selectedBranchId) {
        params.branchId = selectedBranchId;
      }

      const response = (await attendanceService.getAll(
        params,
      )) as PaginatedResponse;

      if (response.data && Array.isArray(response.data)) {
        setAttendances(response.data);
        setMeta({
          total: response.meta.total,
          page: Number(response.meta.page),
          limit: Number(response.meta.limit),
          lastPage: response.meta.lastPage,
        });
      } else {
        setAttendances([]);
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar asistencias");
    } finally {
      setLoadingFetch(false);
    }
  }, [page, selectedBranchId]); // <-- Importante: se ejecuta si cambia la página O la sucursal

  // --- NUEVA FUNCIÓN: Para filtrar por sucursal ---
  const filterByBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    setPage(1); // Siempre volvemos a la página 1 al filtrar
  };

  const registerAttendance = async (data: AttendanceDTO) => {
    setLoadingRegister(true);
    setError(null);
    try {
      await attendanceService.register(data);
      await fetchAttendances();
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoadingRegister(false);
    }
  };

  const nextPage = () => {
    if (Number(meta.page) < meta.lastPage) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (Number(meta.page) > 1) setPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  return {
    attendances,
    meta,
    nextPage,
    prevPage,
    filterByBranch, // <-- Exportamos la función
    selectedBranchId, // <-- Exportamos el estado (para el value del select)
    registerAttendance,
    fetchAttendances,
    loadingFetch,
    loadingRegister,
    error,
  };
};
