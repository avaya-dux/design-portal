import type { ReactNode } from "react";

import { Button as NeoButton, NeoThemeProvider } from "@avaya/neo-react";
import "@avaya/neo/neo/dist/css/neo/neo.min.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, className, ...rest } = props;

  return (
    <NeoThemeProvider>
      <NeoButton
        {...rest}
        className={className}
        onClick={() => onClick?.() || alert("ping")}
      >
        {children}
      </NeoButton>
    </NeoThemeProvider>
  );
};
