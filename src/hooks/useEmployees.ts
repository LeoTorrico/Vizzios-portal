import { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employees";

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
  }) => {
    const newEmp = await createEmployee(emp);
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const editEmployee = async (
    carnet: string,
    emp: {
      firstName?: string;
      lastName?: string;
    },
  ) => {
    const updatedEmp = await updateEmployee(carnet, emp);
    setEmployees((prev) =>
      prev.map((e) => (e.carnet === carnet ? updatedEmp : e)),
    );
  };

  const removeEmployee = async (carnet: string) => {
    await deleteEmployee(carnet);
    setEmployees((prev) => prev.filter((e) => e.carnet !== carnet));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, addEmployee, editEmployee, removeEmployee };
}
