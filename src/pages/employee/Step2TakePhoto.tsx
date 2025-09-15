import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import StepHeader from "../../components/StepHeader";

export default function Step2TakePhoto() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      setIsLoading(true);
      console.log("Intentando acceder a la cámara...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);

        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
          setIsLoading(false);
        };

        videoRef.current.oncanplay = () => {
          setIsCameraReady(true);
          setIsLoading(false);
        };

        await videoRef.current.play().catch((err) => {
          console.error("Error al reproducir video:", err);
          setIsLoading(false);
        });
      }
    } catch (err) {
      console.error("Error completo:", err);
      setIsCameraStarted(false);
      setIsCameraReady(false);
      setIsLoading(false);
      alert("No se pudo acceder a la cámara");
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !isCameraReady) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);

    // Detener cámara después de la foto
    const stream = videoRef.current.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach((track) => track.stop());

    sessionStorage.setItem("employeePhoto", imageData);
  };

  const handleNext = () => {
    if (!photo) return alert("Debe tomar una foto");
    navigate("/empleado/confirmacion");
  };

  const renderCameraArea = () => {
    if (photo) {
      return (
        <img
          src={photo}
          alt="Foto tomada"
          className="w-full aspect-video rounded-lg object-cover border-2 border-gray-200"
        />
      );
    } else if (isLoading) {
      return (
        <div className="w-full aspect-video rounded-lg bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-blue-300">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-blue-600 text-sm font-medium">
            Iniciando cámara...
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Si aparece un popup, permite el acceso
          </p>
        </div>
      );
    } else if (isCameraStarted) {
      return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-green-300">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isCameraReady && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-sm">Preparando cámara...</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="w-full aspect-video rounded-lg bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <svg
            className="w-16 h-16 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-gray-500 text-sm text-center">
            Presiona "Iniciar cámara" para comenzar
          </p>
        </div>
      );
    }
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

        {renderCameraArea()}

        {!photo && (
          <div className="flex gap-3 w-full">
            <Button
              text={isLoading ? "Cargando..." : "Iniciar cámara"}
              onClick={startCamera}
              color="#F6941F"
              disabled={isCameraStarted || isLoading}
            />
            <Button
              text="Tomar foto"
              onClick={takePhoto}
              color="#F6941F"
              disabled={!isCameraReady || isLoading}
            />
          </div>
        )}

        {photo && (
          <div className="flex gap-3 w-full">
            <Button
              text="Tomar otra foto"
              onClick={() => {
                setPhoto(null);
                setIsCameraStarted(false);
                setIsCameraReady(false);
                setIsLoading(false);
                sessionStorage.removeItem("employeePhoto");
              }}
              color="#6B7280"
            />
            <Button text="Siguiente" onClick={handleNext} />
          </div>
        )}
      </div>
    </div>
  );
}
