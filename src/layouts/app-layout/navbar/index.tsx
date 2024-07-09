"use client";

import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { usePathname } from "next/navigation";

type Props = {};

const links = [
  { title: "Home", path: routes.root },
  { title: "Posts", path: routes.posts.root },
  { title: "Categories", path: routes.categories.root },
];

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className="app_container flex items-center gap-1.5 mb-12">
      {links.map((link) => (
        <RouterLink
          key={link.path}
          href={link.path}
          className={`px-3 py-1.5 rounded inline-block duration-300 ${
            pathname === link.path ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          {link.title}
        </RouterLink>
      ))}
    </nav>
  );
};

export default Navbar;
