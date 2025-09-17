import BranchForm from "../../components/BranchForm";
import BranchList from "../../components/BranchList";
import EmployeeForm from "../..//components/EmployeeForm";
import EmployeeList from "../../components/EmployeeList";
import { useBranches } from "../../hooks/useBranches";
import { useEmployees } from "../../hooks/useEmployees";

export default function AdminDashboard() {
  const { branches, addBranch } = useBranches();
  const { employees, addEmployee } = useEmployees();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {/* Sucursales */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Sucursales</h2>
        <BranchForm onSubmit={addBranch} />
        <BranchList branches={branches} />
      </section>

      {/* Empleados */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Empleados</h2>
        <EmployeeForm onSubmit={addEmployee} branches={branches} />
        <EmployeeList employees={employees} branches={branches} />
      </section>
    </div>
  );
}
