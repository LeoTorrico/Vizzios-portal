import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import StepHeader from "../../components/StepHeader";
import { useAttendance } from "../../hooks/useAttendance";

export default function Step3Confirmation() {
  const navigate = useNavigate();
  const { registerAttendance, loadingRegister } = useAttendance();

  const carnet = sessionStorage.getItem("employeeId");
  const imageBase64 = sessionStorage.getItem("employeePhoto");

  const now = new Date();
  const formattedDateTime = now.toLocaleString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Estado para IN/OUT
  const [type, setType] = useState<"IN" | "OUT">("IN");

  const handleRegister = async () => {
    if (!carnet || !imageBase64) return alert("Faltan datos del empleado");
    try {
      await registerAttendance({
        carnet,
        type, // <-- dinámico
        recordedAt: now.toISOString(),
        imageBase64,
      });
      alert("Asistencia registrada correctamente");
      sessionStorage.clear();
      navigate("/empleado");
    } catch {
      alert("Error al registrar asistencia");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#036133] p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center space-y-6">
        <StepHeader
          currentStep={3}
          totalSteps={3}
          title="Confirmación"
          backPath="/empleado/foto"
        />

        <h2 className="text-xl font-bold text-[#036133] text-center">
          Hora de registro: {formattedDateTime}
        </h2>

        <div className="w-full bg-gray-50 rounded-xl p-6 flex flex-col items-center space-y-4 border border-gray-200 shadow-sm">
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="captura"
              className="w-40 h-40 rounded-lg object-cover shadow-md"
            />
          )}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Carnet</p>
            <p className="text-lg font-semibold text-gray-800">{carnet}</p>
          </div>

          {/* Dropdown Entrada / Salida */}
          <div className="w-full">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de registro
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "IN" | "OUT")}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#036133] focus:outline-none"
            >
              <option value="IN">Entrada</option>
              <option value="OUT">Salida</option>
            </select>
          </div>
        </div>

        <Button
          text={loadingRegister ? "Registrando..." : "Registrar asistencia"}
          onClick={handleRegister}
          color="#F6941F"
          disabled={loadingRegister}
        />
      </div>
    </div>
  );
}
