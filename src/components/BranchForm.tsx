import { useState } from "react";

export default function BranchForm({
  onSubmit,
}: {
  onSubmit: (b: { name: string; description?: string }) => void;
}) {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
    setForm({ name: "", description: "" });
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-[#036133] to-[#F7941F] rounded-lg flex items-center justify-center mr-3">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Agregar Nueva Sucursal
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la sucursal *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Sucursal Centro"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción opcional"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7941F] focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#036133] to-[#036133]/80 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-[#036133]/90 hover:to-[#036133]/70 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Agregar Sucursal</span>
          </button>
        </div>
      </form>
    </div>
  );
}
