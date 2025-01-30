import { NavLink } from "@/shared/ui/NavLink";

interface MainNavigationBarProps {
  navigationData: { href: string; title: string }[];
}

export const MainNavigationBar: React.FC<MainNavigationBarProps> = ({
  navigationData,
}) => {
  return (
    <nav className="h-fit text-lg">
      <ul className="flex gap-4">
        {navigationData.map(({ href, title }) => (
          <li key={href}>
            <NavLink href={href} className="py-2">
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
