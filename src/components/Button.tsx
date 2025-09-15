interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  color = "#036133",
  fullWidth = true,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "px-6"}
        py-3 rounded-lg text-white font-semibold text-lg 
        shadow-md transition
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
      `}
      style={{ backgroundColor: disabled ? "#9CA3AF" : color }}
    >
      {text}
    </button>
  );
}
