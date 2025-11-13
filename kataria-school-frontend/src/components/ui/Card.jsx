function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({
  title,
  subtitle,
  children,
  actions,
  media,
  className,
  bodyClassName,
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-base-light-gray bg-base-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-fast ease-custom hover:-translate-y-1 hover:shadow-[0_28px_55px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      {media && (
        <div className="relative h-40 w-full overflow-hidden bg-base-light-gray">
          {typeof media === "string" ? (
            <img
              src={media}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            media
          )}
        </div>
      )}
      <div className={cn("p-6", bodyClassName)}>
        {(title || subtitle || actions) && (
          <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-primary-text">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-secondary-text">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 text-sm text-secondary-text">
                {actions}
              </div>
            )}
          </header>
        )}
        <div className="space-y-4 text-sm text-secondary-text">{children}</div>
      </div>
    </article>
  );
}
