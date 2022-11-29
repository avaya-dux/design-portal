import type { AstroInstance } from "astro";

export interface PageAstroInstance extends AstroInstance {
  title: string;
  keywords: string;
}
