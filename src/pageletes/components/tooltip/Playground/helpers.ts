import type { TooltipCSSPosition, TooltipPosition } from "@avaya/neo-react";

export type TooltipPlacement = "auto" | "top" | "bottom" | "left" | "right";
export type TooltipOffset = "none" | "left" | "right";

export const shouldDisableOffset = (placement: TooltipPlacement) =>
  placement === "left" || placement === "right" || placement === "auto";

export const convertToPosition = (
  direction: TooltipPlacement,
  offset: TooltipOffset
): [TooltipPosition, string] => {
  let position: TooltipPosition = "auto";
  if (direction === "left") {
    position = "left";
  } else if (direction === "right") {
    position = "right";
  } else if (direction === "top") {
    position = "top";
    if (offset === "left") {
      position = "top-left";
    } else if (offset === "right") {
      position = "top-right";
    }
  } else if (direction === "bottom") {
    position = "bottom";
    if (offset === "left") {
      position = "bottom-left";
    } else if (offset === "right") {
      position = "bottom-right";
    }
  }

  const cssPosition = translatePositionToCSSName(position);
  const positionClass = `neo-tooltip--${cssPosition}`;

  return [position, positionClass];
};

// (mostly) copy-pasted from Tooltip/helpers.ts
export const translatePositionToCSSName = (
  passedPosition: TooltipPosition
): TooltipCSSPosition => {
  switch (passedPosition) {
    case "left":
      return "left";
    case "right":
      return "right";
    case "bottom":
      return "down";
    case "top":
    case "auto":
      return "up";
    case "top-left":
      return "up-left";
    case "top-right":
      return "up-right";
    case "bottom-left":
      return "down-left";
    case "bottom-right":
      return "down-right";

    default:
      console.error(
        `Unexpected position encountered: ${passedPosition}. Defaulting to default "position='up'"`
      );
      return "up";
  }
};

export const upperCaseFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
