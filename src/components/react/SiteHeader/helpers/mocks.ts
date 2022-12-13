import type { AstroComponentFactory } from "astro/dist/runtime/server";
import type { PageAstroInstance } from "helpers/types";

export const pagesMockData: PageAstroInstance[] = [
  {
    url: "",
    title: "Home",
    keywords: "Neo landing page",
    default: {} as AstroComponentFactory,
    file: "",
  },
  {
    url: "/about",
    title: "About",
    keywords: "About page",
    default: {} as AstroComponentFactory,
    file: "",
  },
  {
    url: "/contact",
    title: "Contact",
    keywords: "Contact page",
    default: {} as AstroComponentFactory,
    file: "",
  },
];
