export const navItems = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "products", href: "/products" },
  { label: "blog", href: "/blog" },
  { label: "skills", href: "/skills" },
  { label: "achievements", href: "/achievements" },
  { label: "hobbies", href: "/hobbies" },
];

// Separate site, linked at the far right of the nav
export const studioLink = { label: "i make sites", href: "https://studio.rishimalnad.dev" };

export function isActive(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
