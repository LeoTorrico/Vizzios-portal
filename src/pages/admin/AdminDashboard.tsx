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
      gradient: "from-[#036133] to-[#036133]/80", // Verde
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
      gradient: "from-[#F7941F] to-[#F7941F]/80", // Naranja
      route: "/admin/reporte",
    },
    {
      title: "Exportación",
      description: "Exporta reportes detallados en Excel mensual y semanal",
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      gradient: "from-[#036133] to-[#F7941F]", // Mix Verde/Naranja
      route: "/admin/reports",
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      gradient: "from-[#036133] to-[#036133]/80", // Verde
      route: "/admin/empleados",
    },
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
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            points="9 22 9 12 15 12 15 22"
          />
        </svg>
      ),
      gradient: "from-[#F7941F] to-[#F7941F]/80", // Naranja
      route: "/admin/sucursales",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con Logout - Totalmente Responsive */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-10 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Bienvenido de nuevo,{" "}
              <span className="font-semibold text-gray-800">
                {user?.username || "Administrador"}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 text-red-600 font-medium transition-all bg-red-50 rounded-xl hover:bg-red-100 hover:shadow-md active:scale-95 border border-red-100"
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
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Botones de Secciones - Mejorado para 5 items (1 columna en móvil, 2 en tablet, 3 en desktop) */}
        {/* Botones de Secciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigate(section.route)}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col overflow-hidden text-left"
            >
              {/* Encabezado con Gradiente - Agregamos flex-none para evitar que se aplaste */}
              <div
                className={`bg-gradient-to-r ${section.gradient} p-6 sm:p-8 text-white w-full flex flex-col items-center flex-none`}
              >
                {/* Contenedor del Icono - Agregamos flex-shrink-0 */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 backdrop-blur-sm mb-4">
                  {section.icon}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-center">
                  {section.title}
                </h2>
              </div>

              {/* Contenido / Descripción */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white z-10">
                <p className="text-gray-500 text-sm sm:text-base text-center leading-relaxed">
                  {section.description}
                </p>

                <div className="mt-6 flex justify-center">
                  <span className="text-[#036133] font-semibold group-hover:text-[#F7941F] transition-colors flex items-center gap-2">
                    Acceder
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1.5 flex-shrink-0"
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

              {/* Efecto visual de fondo sutil al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
