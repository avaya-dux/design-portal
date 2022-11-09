import { useEffect, useState } from "react";

export const useOsName = () => {
  const [Os, setOs] = useState<string>("");

  const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    setOs(macPlatforms.test(userAgent) ? "macOS" : "windows");
  }, []);

  return Os;
};
