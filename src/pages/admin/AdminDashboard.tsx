import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

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
    {
      title: "Reportes",
      description: "Genera y revisa reportes de asistencia",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-[#036133] to-[#F7941F]",
      route: "/admin/reporte",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header con Logout */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Títulos */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Bienvenido,{" "}
                <span className="font-semibold text-gray-800">
                  {user?.username || "Administrador"}
                </span>
              </p>
            </div>

            {/* Botón Logout (Reemplazando los puntos decorativos) */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 text-red-600 transition-all bg-red-50 rounded-xl hover:bg-red-100 hover:shadow-md active:scale-95 border border-red-100"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Botones de Secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigate(section.route)}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Gradient Header */}
              <div
                className={`bg-gradient-to-r ${section.gradient} p-8 text-white w-full`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {section.title}
                </h2>
              </div>

              {/* Description */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-600 text-center">
                  {section.description}
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="text-[#036133] font-semibold group-hover:text-[#F7941F] transition-colors flex items-center gap-1">
                    Acceder
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
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
