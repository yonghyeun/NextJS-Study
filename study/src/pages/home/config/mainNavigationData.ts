export const mainNavigationData: NavigationBarData[] = [
  { href: "/", title: "Home" },
  {
    href: "/react-19-use",
    title: "React 19 use",
  },
  {
    href: "/react-query-with-nextjs",
    title: "React Query with Next.js",
  },
];

export interface NavigationBarData {
  href: string;
  title: string;
}
