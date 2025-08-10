import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export const Button: React.FC<ButtonProps> = ({
  label,
  loading = false,
  variant = "primary",
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-[140px] px-4 py-1 rounded disabled:opacity-50 transition-colors duration-200",
        variantStyles[variant],
        loading && "animate-pulse",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "loading ..." : label}
    </button>
  );
};
