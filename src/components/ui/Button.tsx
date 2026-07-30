import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-neo-blue text-white border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-y-[2px] active:shadow-none",
  secondary:
    "bg-neo-lime text-neo-black border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-y-[2px] active:shadow-none",
  outline:
    "border-2 border-neo-black text-neo-black bg-white shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-y-[2px] active:shadow-none",
  dark: "bg-neo-black text-white hover:bg-neutral-800",
  ghost: "text-primary-dark hover:bg-neutral-light",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-button transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
