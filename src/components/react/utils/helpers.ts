export const copyTextToClipboard = async (text: string) =>
  await navigator.clipboard.writeText(text);

/**
 * Disables scrolling on the window if screen size is less than mobile max
 *
 * @example
 * disableScrollOnMobile(true, 300, 800) // disables scroll
 * disableScrollOnMobile(false, 300, 800) // does _not_ disable scroll
 */

export const disableScrollOnMobile = (
  isOpen: boolean,
  currentWidth: number,
  mobileMaxWidth: number
) => {
  if (isOpen && currentWidth < mobileMaxWidth) {
    window.scroll(0, 0);
  }
};
