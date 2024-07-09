import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

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
