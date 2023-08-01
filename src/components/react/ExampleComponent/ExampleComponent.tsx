import { Button, NeoThemeProvider } from "@avaya/neo-react";

interface ButtonProps {
  children:React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ExampleComponent = (props: ButtonProps) => {
  const { children, onClick, className, ...rest } = props;

  return (
    <NeoThemeProvider>
      <Button
        {...rest}
        className={className}
        onClick={() => onClick?.() || alert("ping")}
      >
        {children}
      </Button>
    </NeoThemeProvider>
  );
};
