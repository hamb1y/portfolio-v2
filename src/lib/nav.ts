export const navItems = [
  { label: "home", href: "/" },
  { label: "skills", href: "/skills" },
  { label: "academics", href: "/achievements" },
  { label: "projects", href: "/projects" },
  { label: "hobbies", href: "/hobbies" },
  { label: "product (idea)s", href: "/products" },
  { label: "blogs", href: "/blog" },
];

export function isActive(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
