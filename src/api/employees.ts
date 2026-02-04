import { adminClient } from "../api/adminClient";

export async function getEmployees() {
  const { data } = await adminClient.get(`/employees`);
  return data;
}

export async function createEmployee(payload: {
  carnet: string;
  firstName: string;
  lastName?: string;
}) {
  const { data } = await adminClient.post(`/employees`, payload);
  return data;
}

export async function updateEmployee(
  carnet: string,
  payload: {
    firstName?: string;
    lastName?: string;
  },
) {
  const { data } = await adminClient.patch(`/employees/${carnet}`, payload);
  return data;
}

export async function deleteEmployee(carnet: string) {
  const { data } = await adminClient.delete(`/employees/${carnet}`);
  return data;
}
