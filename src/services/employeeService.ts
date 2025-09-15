import type { EmployeeRecord } from "../types";

const API_URL = "http://localhost:4000/api/employees";
export const employeeService = {
  async register(record: EmployeeRecord): Promise<void> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      throw new Error("Error registrando asistencia");
    }
  },
};
