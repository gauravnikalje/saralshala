const baseClasses = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-fast ease-custom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transform hover:-translate-y-0.5";

const variantClasses = {
  primary: "bg-gold text-charcoal-dark hover:bg-gold-deep shadow-level-2 focus-visible:outline-gold",
  secondary: "bg-ivory text-charcoal-dark border-2 border-gold hover:bg-gold-light-hover focus-visible:outline-gold",
  ghost: "text-gold-deep bg-transparent hover:bg-gold hover:text-white focus-visible:outline-gold",
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
