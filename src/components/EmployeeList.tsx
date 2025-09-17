export default function EmployeeList({
  employees,
  branches,
}: {
  employees: any[];
  branches: any[];
}) {
  const getBranchName = (id: string) =>
    branches.find((b) => b.id === id)?.name || "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {employees.map((e) => (
        <div key={e.carnet} className="bg-gray-50 p-4 rounded-lg shadow border">
          <h2 className="font-bold text-lg">
            {e.firstName} {e.lastName}
          </h2>
          <p className="text-gray-600">Carnet: {e.carnet}</p>
          <p className="text-gray-600">Sucursal: {getBranchName(e.branchId)}</p>
        </div>
      ))}
    </div>
  );
}
