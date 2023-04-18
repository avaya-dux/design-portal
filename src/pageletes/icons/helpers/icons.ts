import { icons } from "@avaya/neo-icons/neo-icon-info.js";

import type { IconCategory } from "@avaya/neo-icons/neo-icon-types";

const iconCategories: IconCategory[] = [
  ...new Set(icons.map((icon) => icon.category as IconCategory)),
];

export { icons, iconCategories };
