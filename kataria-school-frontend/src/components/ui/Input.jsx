function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "w-full rounded px-3 py-2 border border-secondary-text/40 bg-base-white text-sm text-primary-text shadow-sm transition focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/40 disabled:cursor-not-allowed disabled:bg-base-light-gray";

export default function Input({ label, error, helperText, className, id, name, required, ...props }) {
  const inputId = id ?? name;
  const hintId = inputId ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-primary-text">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={hintId}
        className={cn(baseClasses, error && "border-red-500 focus:border-red-500 focus:ring-red-200", className)}
        {...props}
      />
      {(error || helperText) && (
        <p id={hintId} className={cn("text-xs", error ? "text-red-500" : "text-secondary-text/80")}> 
          {error || helperText}
        </p>
      )}
    </div>
  );
}
