import axios from "axios";
import { adminClient } from "../api/adminClient";
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
    const res = await adminClient.get(`/attendances`, { params });
    return res.data as PaginatedResponse;
  },

  getDashboard: async (params: any = {}): Promise<PaginatedResponse> => {
    const res = await adminClient.get(`/attendances/dashboard`, {
      params,
    });
    return res.data as PaginatedResponse;
  },
};
