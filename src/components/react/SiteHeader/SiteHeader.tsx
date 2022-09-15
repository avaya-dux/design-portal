import { Button, Logo, Navbar, NavbarButton } from "@avaya/neo-react";
import logoFull from "/imgs/logo-full.svg";

// import logoCondensed from "/imgs/logo-condensed.svg";
// import logoMobile from "/imgs/logo-mobile.svg";

export const SiteHeader = () => {
  const logo = logoFull; // TODO: use different logos for different screen sizes

  return (
    <Navbar
      logo={<Logo src={logo} alt="Avaya Logo" />}
      navButtons={[
        <Button variant="tertiary">What's New</Button>,
        <Button variant="tertiary">Guidelines</Button>,
        <Button variant="tertiary">
          <a href="/components-placeholder">Components</a>
        </Button>,
        <Button variant="tertiary">Icons</Button>,
        <Button variant="tertiary">FAQs</Button>,
        <NavbarButton icon="search" aria-label="Search Icon" />,
      ]}
    />
  );
};
