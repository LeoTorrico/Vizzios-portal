import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
  title?: string;
  backPath?: string;
}

export default function StepHeader({
  currentStep,
  totalSteps,
  title,
  backPath,
}: StepHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between mb-6">
      {backPath ? (
        <button
          onClick={() => navigate(backPath)}
          className="flex items-center gap-2 text-[#036133] hover:opacity-80"
        >
          <ArrowLeft size={20} />
          <span>Atrás</span>
        </button>
      ) : (
        <div className="w-[60px]" />
      )}

      <div className="text-center flex-1">
        <p className="text-sm text-gray-600">
          Paso {currentStep} de {totalSteps}
        </p>
        {title && (
          <h2 className="text-lg font-semibold text-[#036133]">{title}</h2>
        )}
      </div>
      <div className="w-[60px]" />
    </div>
  );
}
