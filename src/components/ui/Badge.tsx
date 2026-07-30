interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "dark" | "outline";
  className?: string;
}

const variantStyles = {
  default: "bg-neo-lime text-neo-black border border-neo-black",
  dark: "bg-neo-black text-white",
  outline: "border-2 border-neo-black text-neo-black bg-transparent shadow-neo-sm",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-button text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
