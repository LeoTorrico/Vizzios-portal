import axios from "axios";

const API_URL = "http://localhost:3000";

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
