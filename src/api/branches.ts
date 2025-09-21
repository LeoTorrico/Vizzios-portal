import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getBranches() {
  const { data } = await axios.get(`${API_URL}/branches`);
  return data;
}

export async function createBranch(payload: {
  name: string;
  description?: string;
}) {
  const { data } = await axios.post(`${API_URL}/branches`, payload);
  return data;
}
