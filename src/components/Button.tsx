interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  fullWidth?: boolean;
}

export default function Button({
  text,
  onClick,
  color = "#036133",
  fullWidth = true,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${fullWidth ? "w-full" : "px-6"}
        py-3 rounded-lg text-white font-semibold text-lg 
        shadow-md hover:opacity-90 transition
      `}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
}
