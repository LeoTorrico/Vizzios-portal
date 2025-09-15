// src/pages/employee/Step2TakePhoto.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import StepHeader from "../../components/StepHeader";

export default function Step2TakePhoto() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("No se pudo acceder a la cámara");
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
    // Guardamos temporalmente
    sessionStorage.setItem("employeePhoto", imageData);
  };

  const handleNext = () => {
    if (!photo) return alert("Debe tomar una foto");
    navigate("/empleado/confirmacion");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#036133] p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center space-y-6">
        <StepHeader
          currentStep={2}
          totalSteps={3}
          title="Tomar Fotografía"
          backPath="/empleado"
        />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg"
        />
        <div className="flex gap-3 w-full">
          <Button text="Iniciar cámara" onClick={startCamera} color="#F6941F" />
          <Button text="Tomar foto" onClick={takePhoto} color="#F6941F" />
        </div>
        {photo && (
          <img src={photo} alt="captura" className="w-40 h-40 rounded-lg" />
        )}
        <Button text="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
}
