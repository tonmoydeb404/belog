import { RouterLink } from "@/router/components";
import { LucideChevronRight } from "lucide-react";
import React from "react";

type Props = {
  links: { title: string; path?: string }[];
  className?: string;
};

const Breadcrumb = (props: Props) => {
  const { links, className } = props;

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {links.map((link, index) => {
        if (!link.path) {
          return (
            <React.Fragment key={link.title + index}>
              <span className="text-sm text-primary-base">{link.title}</span>
              <LucideChevronRight size={18} />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={link.title + index}>
            <RouterLink className="text-sm text-primary-base" href={link.path}>
              {link.title}
            </RouterLink>
            <LucideChevronRight size={18} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
