export default function BranchList({ branches }: { branches: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {branches.map((b) => (
        <div key={b.id} className="bg-gray-50 p-4 rounded-lg shadow border">
          <h2 className="font-bold text-lg">{b.name}</h2>
          <p className="text-gray-600">{b.description || "Sin descripción"}</p>
        </div>
      ))}
    </div>
  );
}
