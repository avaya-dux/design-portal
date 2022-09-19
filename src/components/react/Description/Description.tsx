import type { ReactNode } from "react";

export const Description = ({ children }: { children: ReactNode }) => (
  <p className="global-spacing--text">{children}</p>
);
