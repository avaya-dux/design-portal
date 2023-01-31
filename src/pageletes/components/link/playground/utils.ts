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
    typeOption === "standalone" && iconPlacement !== "none" && "neo-icon-print",
    disabled && "neo-link__disabled",
    typeOption === "inline" && "neo-link__inline"
  );
};
export const createReactCode = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  return `<Link ${createReactAttributes(
    typeOption,
    disabled,
    iconPlacement
  )}>Link</Link>`;
};

const createReactAttributes = (
  typeOption: string,
  disabled: boolean,
  iconPlacement: string
) => {
  const attributes = ['href="#main"'];
  if (disabled) {
    attributes.push("disabled");
  }
  if (typeOption === "inline") {
    attributes.push("inline");
  } else if (iconPlacement !== "none") {
    attributes.push(`placement="${iconPlacement}"`);
    attributes.push('icon="print"');
  }
  return attributes.join(" ");
};
