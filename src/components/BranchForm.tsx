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
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center bg-white shadow p-4 rounded-xl"
    >
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre de sucursal"
        className="border p-2 rounded-md flex-1"
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="border p-2 rounded-md flex-1"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Agregar
      </button>
    </form>
  );
}
