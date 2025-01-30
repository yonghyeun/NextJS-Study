"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onActiveClassName?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  onActiveClassName = "border-b-2 border-white",
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? onActiveClassName : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};
