import axios from "axios";

const API_URL = "http://localhost:3000";

export async function getEmployees() {
  const { data } = await axios.get(`${API_URL}/employees`);
  return data;
}

export async function createEmployee(payload: {
  carnet: string;
  firstName: string;
  lastName?: string;
  branchId: string;
}) {
  const { data } = await axios.post(`${API_URL}/employees`, payload);
  return data;
}
