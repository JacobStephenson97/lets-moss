interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-gray-500 py-1 px-2 font-bold text-gray-200 hover:text-white hover:outline hover:outline-1"
    >
      {label}
    </button>
  );
}
