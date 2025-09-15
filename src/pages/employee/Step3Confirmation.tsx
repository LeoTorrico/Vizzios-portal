import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { employeeService } from "../../services/employeeService";
import StepHeader from "../../components/StepHeader";

export default function Step3Confirmation() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("employeeId");
  const photo = sessionStorage.getItem("employeePhoto");

  const now = new Date();
  const formattedDateTime = now.toLocaleString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleRegister = async () => {
    if (!id || !photo) return alert("Faltan datos del empleado");
    try {
      await employeeService.register({
        id,
        photo,
        timestamp: now.toISOString(),
      });
      alert("Asistencia registrada correctamente");
      sessionStorage.clear();
      navigate("/empleado");
    } catch (err) {
      alert("Error al registrar asistencia");
      console.error(err);
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
          {photo && (
            <img
              src={photo}
              alt="captura"
              className="w-40 h-40 rounded-lg object-cover shadow-md"
            />
          )}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Carnet</p>
            <p className="text-lg font-semibold text-gray-800">{id}</p>
          </div>
        </div>

        <Button
          text="Registrar asistencia"
          onClick={handleRegister}
          color="#F6941F"
        />
      </div>
    </div>
  );
}
