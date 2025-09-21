import axios from "axios";
import type { AttendanceDTO } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const attendanceService = {
  register: async (data: AttendanceDTO) => {
    const res = await axios.post(`${API_URL}/attendances`, data);
    return res.data;
  },

  getAll: async () => {
    const res = await axios.get(`${API_URL}/attendances`);
    return res.data;
  },
};
