import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        padding: "1em 1.8em",
        borderRadius: 8,
        background: "var(--color-primary)",
        color: "var(--color-text)",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1rem",
        fontWeight: 500,
        transition: "background 0.2s",
        ...((className ? {} : {}) as React.CSSProperties),
      }}
    >
      {children}
    </button>
  );
}