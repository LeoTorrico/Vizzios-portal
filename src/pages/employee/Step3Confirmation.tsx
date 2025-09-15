// src/pages/employee/Step3Confirmation.tsx
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { employeeService } from "../../services/employeeService";
import StepHeader from "../../components/StepHeader";

export default function Step3Confirmation() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("employeeId");
  const photo = sessionStorage.getItem("employeePhoto");

  const handleRegister = async () => {
    if (!id || !photo) return alert("Faltan datos del empleado");
    try {
      await employeeService.register({
        id,
        photo,
        timestamp: new Date().toISOString(),
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
        <h2 className="text-2xl font-bold text-[#036133]">Confirmación</h2>
        <p className="text-center">Carnet: {id}</p>
        {photo && (
          <img src={photo} alt="captura" className="w-40 h-40 rounded-lg" />
        )}
        <Button
          text="Registrar asistencia"
          onClick={handleRegister}
          color="#F6941F"
        />
      </div>
    </div>
  );
}
