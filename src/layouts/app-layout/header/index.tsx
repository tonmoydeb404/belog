import logo from "@/assets/logo/logo.png";
import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import Image from "next/image";

const Header = () => {
  return (
    <header className="app_container pt-4 mb-8 flex items-center">
      <div className="flex items-center gap-2 mr-auto">
        <RouterLink href={routes.root}>
          <Image src={logo} alt="Be" width={45} />
        </RouterLink>
        <div className="hidden sm:block">
          <h2 className="text-2xl font-bold mb-0.5">
            <RouterLink href={routes.root}>Belog</RouterLink>
          </h2>
          <p className="text-sm opacity-75">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
