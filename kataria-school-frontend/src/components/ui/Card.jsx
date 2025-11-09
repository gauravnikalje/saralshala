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
        "overflow-hidden rounded-lg border border-[#EDEFF3] bg-ivory shadow-soft transition-all duration-fast ease-custom hover:shadow-lifted hover:-translate-y-1",
        className
      )}
    >
      {media && (
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
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
                <h3 className="text-lg font-semibold text-charcoal-dark">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-charcoal">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 text-sm text-charcoal">
                {actions}
              </div>
            )}
          </header>
        )}
        <div className="space-y-4 text-sm text-charcoal">{children}</div>
      </div>
    </article>
  );
}
