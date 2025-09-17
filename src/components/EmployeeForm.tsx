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
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 items-center bg-white shadow p-4 rounded-xl mt-6"
    >
      <input
        type="text"
        name="carnet"
        value={form.carnet}
        onChange={handleChange}
        placeholder="Carnet"
        className="border p-2 rounded-md flex-1"
      />
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 rounded-md flex-1"
      />
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Apellido"
        className="border p-2 rounded-md flex-1"
      />
      <select
        name="branchId"
        value={form.branchId}
        onChange={handleChange}
        className="border p-2 rounded-md flex-1"
      >
        <option value="">Seleccione sucursal</option>
        {branches.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md">
        Agregar
      </button>
    </form>
  );
}
