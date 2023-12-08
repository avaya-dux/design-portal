import type { AstroInstance } from "astro";

export interface PageAstroInstance extends AstroInstance {
  title: string;
  keywords: string;
  order?: number;
}

export interface SitePages {
  accessibility: Array<PageAstroInstance>;
  components: Array<PageAstroInstance>;
  docs: Array<PageAstroInstance>;
  guidelines: Array<PageAstroInstance>;
}
