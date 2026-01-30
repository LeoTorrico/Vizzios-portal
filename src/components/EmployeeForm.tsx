import { useState, useEffect } from "react";

export default function EmployeeForm({
  onSubmit,
  editingEmployee,
  onCancelEdit,
}: {
  onSubmit: (emp: {
    carnet: string;
    firstName: string;
    lastName?: string;
  }) => void;
  editingEmployee?: any;
  onCancelEdit?: () => void;
}) {
  const [form, setForm] = useState({
    carnet: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        carnet: editingEmployee.carnet,
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName || "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.carnet || !form.firstName) return;
    onSubmit(form);
    setForm({ carnet: "", firstName: "", lastName: "" });
  };

  const handleCancel = () => {
    setForm({ carnet: "", firstName: "", lastName: "" });
    if (onCancelEdit) onCancelEdit();
  };

  const isEditMode = !!editingEmployee;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
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
            {isEditMode ? "Editar Empleado" : "Registrar Nuevo Empleado"}
          </h3>
        </div>
        {isEditMode && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Modo Edición
          </span>
        )}
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
                disabled={isEditMode}
                className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7941F] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md ${
                  isEditMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
            {isEditMode && (
              <p className="text-xs text-gray-500">
                El carnet no se puede modificar
              </p>
            )}
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
        </div>

        <div className="flex justify-end space-x-3">
          {isEditMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Cancelar</span>
            </button>
          )}
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
                d={
                  isEditMode
                    ? "M5 13l4 4L19 7"
                    : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                }
              />
            </svg>
            <span>
              {isEditMode ? "Actualizar Empleado" : "Registrar Empleado"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
