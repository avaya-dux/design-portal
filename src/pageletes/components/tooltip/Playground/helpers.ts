import type { TooltipPosition } from "@avaya/neo-react";

// (mostly) copy-pasted from Tooltip/helpers.ts
export const translatePositionToCSSName = (
  position: TooltipPosition = "top"
): string => {
  let cssPosition;

  switch (position) {
    case "left":
      cssPosition = "left";
      break;

    case "right":
      cssPosition = "right";
      break;

    case "bottom":
      cssPosition = "down";
      break;

    case "top":
    case "auto":
      cssPosition = "up";
      break;

    case "top-left":
      cssPosition = "up-left";
      break;

    case "top-right":
      cssPosition = "up-right";
      break;

    case "bottom-left":
      cssPosition = "down-left";
      break;

    case "bottom-right":
      cssPosition = "down-right";
      break;

    default:
      console.error(
        `Unexpected position encountered: ${position}. Defaulting to default "position='up'"`
      );
      cssPosition = "up";
  }

  return `neo-tooltip--${cssPosition};`;
};

export const upperCaseFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
