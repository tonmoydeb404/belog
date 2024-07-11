import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Header from "./header";

const Footer = dynamic(() => import("./footer"), { ssr: false });

type Props = {
  children: ReactNode;
};

export const AppLayout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <div className="app_container">{children}</div>
      <Footer />
    </>
  );
};
