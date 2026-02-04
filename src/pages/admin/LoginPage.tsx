import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../api/authService";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await authService.login(credentials);
      login(data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#036133] p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center space-y-6">
        {/* Logo */}
        <img
          src="/logo.jpg"
          alt="Logo de Vizzios"
          className="w-40 h-40 object-contain"
        />

        {/* Título */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#036133] uppercase tracking-wide">
            Administración
          </h2>
          <p className="text-gray-600 text-sm mt-1">Sistema de Asistencia</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border-2 border-[#036133] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#036133] text-center text-lg"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border-2 border-[#036133] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#036133] text-center text-lg"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition ${
              isLoading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{ backgroundColor: "#F6941F" }}
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
