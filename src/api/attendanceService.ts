import axios from "axios";
import type { AttendanceDTO, PaginatedResponse } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const attendanceService = {
  register: async (data: AttendanceDTO) => {
    const token = localStorage.getItem("TERMINAL_TOKEN");
    const res = await axios.post(`${API_URL}/attendances`, data, {
      headers: {
        "X-TERMINAL-TOKEN": token,
      },
    });
    return res.data;
  },

  getAll: async (params: any = {}): Promise<PaginatedResponse> => {
    const res = await axios.get(`${API_URL}/attendances`, { params });
    return res.data as PaginatedResponse;
  },
};
