import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { PageAstroInstance, SitePages } from "helpers/types";

export const filteredPagesMockData: PageAstroInstance[] = [
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

export const allPagesMockData: SitePages = {
  accessibility: [
    {
      default: {} as AstroComponentFactory,
      file: "/Users/enriquep/dev/design-portal/src/pages/accessibility/principles.astro",
      url: "/accessibility/principles",
      title: "Principles",
      keywords: "principle component",
    },
    {
      default: {} as AstroComponentFactory,
      file: "/Users/enriquep/dev/design-portal/src/pages/accessibility/resources-guides.astro",
      url: "/accessibility/resources-guides",
      title: "Resources and Guides",
      keywords: "resources guides",
    },
    {
      default: {} as AstroComponentFactory,
      file: "/Users/enriquep/dev/design-portal/src/pages/accessibility/testing-tools.astro",
      url: "/accessibility/testing-tools",
      title: "Testing Tools",
      keywords: "Testing Tools",
    },
  ],
  components: [
    {
      default: {} as AstroComponentFactory,
      file: "/Users/enriquep/dev/design-portal/src/pages/components/accordion.astro",
      url: "/components/accordion",
      title: "Accordion",
      keywords: "stack stacked menu expandable component",
    },
  ],
  docs: [],
  guidelines: [],
};
