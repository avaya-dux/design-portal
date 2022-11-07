export const copyTextToClipboard = async (text: string) =>
  await navigator.clipboard.writeText(text);

export const OsName = (userAgent: string) => {
  const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

  if (macPlatforms.test(userAgent)) {
    return "macOS";
  } else return "windows";
};
