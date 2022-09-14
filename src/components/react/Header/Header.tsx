import type { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => (
  <h1 className="neo-bold">{children}</h1>
);
