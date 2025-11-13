const baseClasses = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0";

const variantClasses = {
  primary: "bg-accent-gold text-white border-2 border-accent-gold hover:bg-transparent hover:text-accent-gold hover:shadow-[0_8px_25px_rgba(255,193,7,0.3)] focus-visible:outline-accent-gold backdrop-blur-sm",
  "primary-light": "bg-white text-primary-navy border-2 border-white hover:bg-transparent hover:text-white hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] focus-visible:outline-white backdrop-blur-sm",
  secondary: "bg-text-light text-brand-primary border-2 border-brand-primary hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-secondary hover:shadow-[0_8px_25px_rgba(59,130,246,0.2)] focus-visible:outline-brand-primary backdrop-blur-sm",
  ghost: "text-brand-primary bg-transparent border border-transparent hover:border-brand-secondary hover:bg-brand-secondary/10 hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] focus-visible:outline-brand-secondary",
  outline: "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-text-light hover:shadow-[0_8px_25px_rgba(59,130,246,0.2)] focus-visible:outline-brand-primary backdrop-blur-sm",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  loadingText,
  ...props
}) {
  const variantClass = variantClasses[variant] ?? variantClasses.primary;
  const sizeClass = sizeClasses[size] ?? sizeClasses.md;

  return (
    <button
      className={cn(baseClasses, variantClass, sizeClass, className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          {loadingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
