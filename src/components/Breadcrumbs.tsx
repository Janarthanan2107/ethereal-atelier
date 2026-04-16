import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="px-6 pt-32 md:px-16 md:pt-36 lg:px-[120px]"
    >
      <ol className="flex flex-wrap items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
        <li>
          <Link to="/" className="transition-colors duration-300 hover:text-gold">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <li aria-hidden="true" className="text-gold/60">
              /
            </li>
            <li>
              {item.to && idx < items.length - 1 ? (
                <Link
                  to={item.to}
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
