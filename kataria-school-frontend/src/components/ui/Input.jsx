import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseInputClasses =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-100";

const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-200";

const Input = forwardRef(
  (
    {
      id,
      label,
      hint,
      error,
      className,
      inputClassName,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? props.name;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseInputClasses,
            error ? errorClasses : null,
            inputClassName
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-slate-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
