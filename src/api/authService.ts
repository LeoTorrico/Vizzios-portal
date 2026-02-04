import axios from "axios";
import type { LoginCredentials, LoginResponse } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      credentials,
    );
    return res.data;
  },
};
