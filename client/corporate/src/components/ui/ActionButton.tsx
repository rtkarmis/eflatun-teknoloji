import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  href: string;
  title: string;
  color?: string;
  bgColor?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  href,
  title,
  color = "#3A86FF",
  bgColor = "#fff",
  icon,
  className = "",
  style,
  target,
  rel,
}) => (
  <Link
    href={href}
    className={`font-semibold px-6 py-3 rounded-lg transition ${className}`}
    style={{ color, background: bgColor, ...(style || {}) }}
    {...(target ? { target } : {})}
    {...(rel ? { rel } : {})}
  >
    <span className="flex items-center justify-center">
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span>{title}</span>
    </span>
  </Link>
);

export default ActionButton;
