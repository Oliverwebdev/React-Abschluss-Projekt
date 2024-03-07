import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Account from "./Account";
import Anmeldung from "./Anmeldung";

function Header() {
  return (
    <>
      <header>
        <Logo />
        <Nav />
        <Anmeldung />
        <Account />
      </header>
    </>
  );
}

export default Header;
