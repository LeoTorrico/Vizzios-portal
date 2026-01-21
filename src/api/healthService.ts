import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const healthService = {
  warmup: async () => {
    try {
      await axios.get(`${API_URL}/branches/health`, {
        timeout: 3000,
      });
    } catch {}
  },
};
