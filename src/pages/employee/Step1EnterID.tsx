import { useEffect, useState } from "react";
import StepHeader from "../../components/StepHeader";

export default function Step1EnterID() {
  const [time, setTime] = useState(new Date());
  const [id, setId] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleNext = () => {
    if (!id.trim()) return alert("Ingrese su número de carnet");
    sessionStorage.setItem("employeeId", id);
    window.location.href = "/empleado/foto";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#036133] p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center space-y-6">
        <StepHeader currentStep={1} totalSteps={3} title="Ingresar Carnet" />
        <img
          src="/logo.jpg"
          alt="Logo de Vizzios"
          className="w-56 h-56 object-contain"
        />

        <div className="text-4xl md:text-5xl font-mono text-[#036133]">
          {formattedTime}
        </div>

        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese su carnet"
          className="w-full px-4 py-2 border-2 border-[#036133] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#036133] text-center text-lg"
        />

        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: "#F6941F" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
