export const copyTextToClipboard = async (text: string) =>
  await navigator.clipboard.writeText(text);

export const disableScroll = (
  isOpen: boolean,
  currentWidth: number,
  mobileMaxWidth: number
) => {
  if (isOpen && currentWidth < mobileMaxWidth) {
    window.scroll(0, 0);
  }
};
