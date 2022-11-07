export const copyTextToClipboard = async (text: string) =>
  await navigator.clipboard.writeText(text);

export const OsName = (userAgent: string) => {
  const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

  return macPlatforms.test(userAgent) ? "macOS" : "windows";
};
