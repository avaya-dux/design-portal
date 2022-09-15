import { Button, Navbar, NavbarButton } from "@avaya/neo-react";
import logoCondensed from "/imgs/logo-condensed.svg";
import logoFull from "/imgs/logo-full.svg";
import logoMobile from "/imgs/logo-mobile.svg";

export const SiteHeader = () => (
  <Navbar
    logo={<DesignPortalLogo />}
    navButtons={[
      <Button variant="tertiary">What's New</Button>,
      <Button variant="tertiary">Guidelines</Button>,
      <a href="/components-placeholder">Components</a>,
      <Button variant="tertiary">Icons</Button>,
      <Button variant="tertiary">FAQs</Button>,
      <NavbarButton icon="search" aria-label="Search Icon" />,
    ]}
  />
);

const DesignPortalLogo = () => (
  <a href="/">
    <picture>
      <source media="(max-width: 1024px)" srcSet={logoMobile} />
      <source media="(max-width: 1440px)" srcSet={logoCondensed} />
      <img src={logoFull} alt="Avaya Logo" />
    </picture>
  </a>
);
// found the above solution via: https://stackoverflow.com/q/30460681/1022765
