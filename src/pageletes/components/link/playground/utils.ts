import clsx from "clsx";

export const createHtmlCode = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  return clsx(
    "<a",
    `class="${createHtmlClasses(typeOption, disabled, iconPlacement)}"`,
    iconPlacement === "right" && typeOption === "standalone" && 'dir="rtl"',
    'href="#main">Link</a>'
  );
};

const createHtmlClasses = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  return clsx(
    "neo-link",
    iconPlacement !== "none" && "neo-icon-print",
    disabled && "neo-link__disabled",
    typeOption === "inline" && "neo-link__inline"
  );
};
export const createReactCode = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  return `<Link ${createReacAttributes(
    typeOption,
    disabled,
    iconPlacement
  )}>Link</Link>`;
};

const createReacAttributes = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  if (typeOption === "inline") {
    return clsx('href="#main"', "inline", disabled && "disabled");
  } else {
    if (iconPlacement === "none") {
      return clsx('href="#main"', disabled && "disabled");
    } else {
      return clsx(
        'href="#main"',
        `placement="${iconPlacement === "right" ? "right" : "left"}"`,
        disabled && "disabled",
        'icon="print"'
      );
    }
  }
};
