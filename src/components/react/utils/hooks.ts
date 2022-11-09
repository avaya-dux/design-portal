import { useEffect, useState } from "react";

export const useOsName = () => {
  const [os, setOs] = useState<string>("");

  const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    setOs(macPlatforms.test(userAgent) ? "macos" : "windows");
  }, []);

  return os;
};
