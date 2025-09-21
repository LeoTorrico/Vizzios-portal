import type { AttendanceDTO } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const attendanceService = {
  register: async (data: AttendanceDTO) => {
    const res = await fetch(`${API_URL}/attendances`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error al registrar asistencia: ${res.statusText}`);
    }

    return await res.json();
  },
};
