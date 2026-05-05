import { forwardRef, type InputHTMLAttributes } from "react";
import "./TextField.css";

export type TextFieldProps = {
  id: string;
  label?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/** Text field — same token contract as Design System `Text_Input` (3784:2072). */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, error, disabled, className, ...rest },
  ref,
) {
  const rootClass = [
    "ds-text-field",
    error && "ds-text-field--error",
    disabled && "ds-text-field--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {label ? (
        <label className="ds-text-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input ref={ref} id={id} className="ds-text-field__control" disabled={disabled} {...rest} />
    </div>
  );
});
