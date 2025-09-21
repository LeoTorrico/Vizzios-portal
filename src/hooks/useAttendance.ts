import { useState } from "react";
import { attendanceService } from "../api/attendanceService";
import type { AttendanceDTO } from "../types";

export const useAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerAttendance = async (data: AttendanceDTO) => {
    setLoading(true);
    setError(null);
    try {
      await attendanceService.register(data);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerAttendance, loading, error };
};
