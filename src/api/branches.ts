import { adminClient } from "../api/adminClient";

export async function getBranches() {
  const { data } = await adminClient.get(`/branches`);
  return data;
}

export async function createBranch(payload: {
  name: string;
  description?: string;
}) {
  const { data } = await adminClient.post(`/branches`, payload);
  return data;
}
