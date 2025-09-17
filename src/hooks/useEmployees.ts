import { useState, useEffect } from "react";
import { getEmployees, createEmployee } from "../api/employees";

export function useEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data as any[]);
    setLoading(false);
  };

  const addEmployee = async (emp: {
    carnet: string;
    firstName: string;
    lastName?: string;
    branchId: string;
  }) => {
    const newEmp = await createEmployee(emp);
    setEmployees((prev) => [newEmp, ...prev]);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, addEmployee };
}
