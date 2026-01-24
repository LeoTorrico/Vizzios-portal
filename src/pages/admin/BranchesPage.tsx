import { useNavigate } from "react-router-dom";
import BranchForm from "../../components/BranchForm";
import BranchList from "../../components/BranchList";
import { useBranches } from "../../hooks/useBranches";

export default function BranchesPage() {
  const navigate = useNavigate();
  const { branches, addBranch } = useBranches();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Botón Volver */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 flex items-center text-gray-600 hover:text-[#036133] transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Panel
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#036133]/80 bg-clip-text text-transparent">
                Gestión de Sucursales
              </h1>
              <p className="text-gray-600 mt-2">
                Administra las sucursales de tu empresa
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-gradient-to-r from-[#036133] to-[#036133]/80 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
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
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#036133] to-[#036133]/80 p-6">
            <h2 className="text-2xl font-bold text-white">Sucursales</h2>
            <p className="text-white/80 mt-1">
              Crea y administra tus sucursales
            </p>
          </div>
          <div className="p-6 space-y-6">
            <BranchForm onSubmit={addBranch} />
            <BranchList branches={branches} />
          </div>
        </div>
      </div>
    </div>
  );
}
