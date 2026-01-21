import { useState, useEffect } from "react";
import { attendanceService } from "../api/attendanceService";
import type { AttendanceDTO } from "../types";

export const useAttendance = () => {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = async () => {
    setLoadingFetch(true);
    setError(null);
    try {
      const data = await attendanceService.getAll();
      setAttendances(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al cargar asistencias");
    } finally {
      setLoadingFetch(false);
    }
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

  useEffect(() => {
    fetchAttendances();
  }, []);

  return {
    attendances,
    registerAttendance,
    fetchAttendances,
    loadingFetch,
    loadingRegister,
    error,
  };
};
