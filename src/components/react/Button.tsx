import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, className, ...rest } = props;

  return (
    <button {...rest} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
