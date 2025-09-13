import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [number, setNumber] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleRegister = () => {
    console.log("Número ingresado:", number);
    alert("Asistencia registrada para el número: " + number);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#036133] p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center space-y-6">
        {/* Logo */}
        <img
          src="/vizzios-logo.png"
          alt="Logo de Vizzios"
          className="w-56 h-56 object-contain"
        />

        {/* Reloj */}
        <div className="text-4xl md:text-5xl font-mono text-[#036133]">
          {formattedTime}
        </div>

        {/* Input */}
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Ingrese su número"
          className="w-full px-4 py-2 border-2 border-[#036133] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#036133] text-center text-lg"
        />

        {/* Botón */}
        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: "#F6941F" }}
        >
          Registrar asistencia
        </button>
      </div>
    </div>
  );
}
