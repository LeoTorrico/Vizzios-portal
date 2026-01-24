import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Sucursales",
      description: "Administra las sucursales de tu empresa",
      icon: (
        <svg
          className="w-12 h-12"
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
      ),
      gradient: "from-[#036133] to-[#036133]/80",
      route: "/admin/sucursales",
    },
    {
      title: "Empleados",
      description: "Gestiona el personal de tu organización",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-[#F7941F] to-[#F7941F]/80",
      route: "/admin/empleados",
    },
    {
      title: "Asistencias",
      description: "Monitorea la asistencia del personal",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      gradient: "from-[#036133] to-[#F7941F]",
      route: "/admin/asistencias",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Selecciona una sección para administrar
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#036133]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F7941F]"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Botones de Secciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigate(section.route)}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div
                className={`bg-gradient-to-r ${section.gradient} p-8 text-white`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {section.title}
                </h2>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="text-gray-600 text-center">
                  {section.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="text-[#036133] font-semibold group-hover:text-[#F7941F] transition-colors">
                    Acceder →
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#036133]/5 to-[#F7941F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
