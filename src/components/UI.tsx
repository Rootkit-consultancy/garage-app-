import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function IconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button className="icon-btn" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function PillButton({
  children,
  onClick,
  variant = "default",
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary";
  size?: "md" | "sm";
}) {
  return (
    <button
      className={`pill ${variant === "primary" ? "primary" : ""} ${size === "sm" ? "sm" : ""}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function SectionTitle({
  title,
  right,
}: {
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="row between">
      <h3 className="section-title">{title}</h3>
      {right}
    </div>
  );
}

