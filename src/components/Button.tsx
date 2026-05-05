import type { ButtonHTMLAttributes, ReactNode } from "react";
import caretSmIcon from "../assets/icons16/Icon/16/Caret Sm.svg";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "rounded";
/** Inventory labels: Default · Hover/Pressed · Disabled */
export type ButtonVisualState = "default" | "hover-pressed" | "disabled";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  visualState?: ButtonVisualState;
  fullWidth?: boolean;
  /** Optional icon before label */
  leading?: ReactNode;
  /** Optional icon after label (e.g. chevron for split affordance) */
  trailing?: ReactNode;
  /** Adds a right-side caret for dropdown behavior. */
  dropdown?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button — matches Abstract inventory (primary blurple, bordered secondary,
 * compact rows in notebook chrome).
 */
export function Button({
  variant = "secondary",
  size = "md",
  visualState = "default",
  fullWidth,
  leading,
  trailing,
  dropdown = false,
  children,
  className,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    `ds-button--state-${visualState}`,
    fullWidth && "ds-button--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const trailingNode =
    trailing ??
    (dropdown ? <img src={caretSmIcon} alt="" aria-hidden width={16} height={16} /> : null);

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {leading ? <span className="ds-button__leading">{leading}</span> : null}
      {children ? <span className="ds-button__label">{children}</span> : null}
      {trailingNode ? <span className="ds-button__trailing">{trailingNode}</span> : null}
    </button>
  );
}
