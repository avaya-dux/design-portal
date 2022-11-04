import { useEffect, useState } from "react";

export const useDetectOS = () => {
  const [OS, setOS] = useState<string>("");

  const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
  const windowsPlatforms = /(win32|win64|windows|wince)/i;

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (macPlatforms.test(userAgent)) setOS("macOS");

    if (windowsPlatforms.test(userAgent)) setOS("windows");
  }, []);

  return OS;
};
