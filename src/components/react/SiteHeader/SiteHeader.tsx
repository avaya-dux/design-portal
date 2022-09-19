import { TopNav } from "@avaya/neo-react";
import { useState } from "react";

export const SiteHeader = () => {
  const [, setSearch] = useState("");

  return (
    <TopNav
      logo={
        <a href="/" aria-label="Homepage">
          <picture>
            <source
              media="(max-width: 1024px)"
              srcSet="/imgs/logo-mobile.svg"
            />
            <source
              media="(max-width: 1440px)"
              srcSet="/imgs/logo-condensed.svg"
            />
            <img src="/imgs/logo-full.svg" alt="Avaya Logo" />
          </picture>
        </a>
      }
      skipNav={
        <TopNav.SkipNav href="#main-content">
          Skip To Main Content
        </TopNav.SkipNav>
      }
    >
      <TopNav.LinkButton href="/whats-new">
        What's New
      </TopNav.LinkButton>

      <TopNav.LinkButton href="/guidelines">
        Guidelines
      </TopNav.LinkButton>

      <TopNav.LinkButton href="/components-placeholder">
        Components
      </TopNav.LinkButton>

      <TopNav.LinkButton href="/icons">
        Icons
      </TopNav.LinkButton>

      <TopNav.LinkButton href="/faqs">FAQs</TopNav.LinkButton>

      <TopNav.Search onChange={(e) => setSearch(e.currentTarget.value)} />
    </TopNav>
  );
};
