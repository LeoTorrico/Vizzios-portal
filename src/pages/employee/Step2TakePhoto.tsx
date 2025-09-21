import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import StepHeader from "../../components/StepHeader";

export default function Step2TakePhoto() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, []);

  const startCamera = async () => {
    if (isCameraStarted || isLoading) return;
    try {
      setIsLoading(true);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia no está disponible en este navegador");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
          setIsCameraStarted(true);
          setIsCameraReady(true);
          setIsLoading(false);
        } catch (playErr) {
          console.warn("play() falló, reintentando...", playErr);
          setTimeout(async () => {
            try {
              await videoRef.current?.play();
              setIsCameraStarted(true);
              setIsCameraReady(true);
            } catch (err) {
              console.error("Reintento de play() falló:", err);
            } finally {
              setIsLoading(false);
            }
          }, 250);
        }
      } else {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setIsLoading(false);
        alert("Error interno: video element no disponible.");
      }
    } catch (err: any) {
      console.error("Error startCamera:", err);
      setIsLoading(false);
      setIsCameraStarted(false);
      setIsCameraReady(false);

      let msg = "No se pudo acceder a la cámara.";
      if (err && err.name === "NotAllowedError") {
        msg = "Permisos denegados. Permite el acceso a la cámara.";
      } else if (err && err.name === "NotFoundError") {
        msg = "No se encontró ninguna cámara.";
      } else if (err && err.message) {
        msg += " " + err.message;
      }
      alert(msg);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !isCameraReady) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.3);

    setPhoto(imageData);
    sessionStorage.setItem("employeePhoto", imageData);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;

    setIsCameraStarted(false);
    setIsCameraReady(false);
  };

  const handleNext = () => {
    if (!photo) return alert("Debe tomar una foto");
    navigate("/empleado/confirmacion");
  };

  const handleRetake = async () => {
    setPhoto(null);
    setIsCameraReady(false);
    setIsCameraStarted(false);
    await startCamera();
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

        <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transition-opacity ${
              isCameraStarted ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundColor: "black" }}
          />

          {!isCameraStarted && !isLoading && !photo && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
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
              <p className="text-gray-500 text-sm text-center pointer-events-none">
                Presiona "Iniciar cámara" para comenzar
              </p>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
              <p className="text-blue-600 text-sm font-medium">
                Iniciando cámara...
              </p>
            </div>
          )}
          {isCameraStarted && !isCameraReady && !isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-sm">Preparando cámara...</p>
            </div>
          )}

          {photo && (
            <img
              src={photo}
              alt="Foto tomada"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {!photo ? (
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
        ) : (
          <div className="flex gap-3 w-full">
            <Button
              text="Tomar otra foto"
              onClick={handleRetake}
              color="#6B7280"
            />
            <Button text="Siguiente" onClick={handleNext} />
          </div>
        )}
      </div>
    </div>
  );
}
