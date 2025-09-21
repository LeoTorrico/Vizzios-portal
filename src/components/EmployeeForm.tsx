import { useState } from "react";

export default function EmployeeForm({
  onSubmit,
  branches,
}: {
  onSubmit: (emp: {
    carnet: string;
    firstName: string;
    lastName?: string;
    branchId: string;
  }) => void;
  branches: any[];
}) {
  const [form, setForm] = useState({
    carnet: "",
    firstName: "",
    lastName: "",
    branchId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.carnet || !form.firstName || !form.branchId) return;
    onSubmit(form);
    setForm({ carnet: "", firstName: "", lastName: "", branchId: "" });
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 rounded-lg flex items-center justify-center mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Registrar Nuevo Empleado
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Carnet de Identidad *
            </label>
            <div className="relative">
              <input
                type="text"
                name="carnet"
                value={form.carnet}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7941F] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre *
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Nombre del empleado"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Apellido del empleado"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Sucursal *
            </label>
            <div className="relative">
              <select
                name="branchId"
                value={form.branchId}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7941F] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none"
              >
                <option value="">Seleccione sucursal</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-[#F7941F]/90 hover:to-[#F7941F]/70 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span>Registrar Empleado</span>
          </button>
        </div>
      </form>
    </div>
  );
}
