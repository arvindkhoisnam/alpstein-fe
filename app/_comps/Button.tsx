type Type = "primary" | "secondary";

function Button({
  type,
  children,
  onClick,
}: {
  type: Type;
  children: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "primary"
          ? "btn-glow w-28 py-1 text-[var(--primarytext)] bg-[var(--background)] text-sm transition-all hover:bg-[var(--btnhover)]"
          : "px-2 py-0.5 bg-blue-500 text-zinc-50"
      } cursor-pointer font-extralight text-sm rounded-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
