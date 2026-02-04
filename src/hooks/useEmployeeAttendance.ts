import { useState } from "react";
import type { AttendanceDTO } from "../types";
import { attendanceService } from "../api/attendanceService";

export const useEmployeeAttendance = () => {
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerAttendance = async (data: AttendanceDTO) => {
    setLoadingRegister(true);
    setError(null);
    try {
      await attendanceService.register(data);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoadingRegister(false);
    }
  };

  return {
    registerAttendance,
    loadingRegister,
    error,
  };
};
