import { useStore } from "@nanostores/react";
import { themesToFilterFor } from "./utils";

export const DynamicTheme = ({ children }: { children: React.ReactNode }) => {
  const filteredTheme = useStore(themesToFilterFor);
  console.log({ filteredTheme });
  return (
    <div className={`neo-${filteredTheme} main__theme__styles`}>
      {children}
    </div>
  );
};
