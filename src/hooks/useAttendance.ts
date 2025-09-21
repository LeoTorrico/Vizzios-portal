import { useState, useEffect } from "react";
import { attendanceService } from "../api/attendanceService";
import type { AttendanceDTO } from "../types";

export const useAttendance = () => {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAll();
      setAttendances(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al cargar asistencias");
    } finally {
      setLoading(false);
    }
  };

  const registerAttendance = async (data: AttendanceDTO) => {
    setLoading(true);
    setError(null);
    try {
      await attendanceService.register(data);
      await fetchAttendances();
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  return { attendances, registerAttendance, fetchAttendances, loading, error };
};
