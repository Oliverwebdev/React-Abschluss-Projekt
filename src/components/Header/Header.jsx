import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Account from "./Account";

function Header() {
  return (
    <>
      <header>
        <Logo />
        <Nav />
        {/* <Logo />

      <Nav />
      <Account /> */}
      </header>
      {/* hier vielleicht noch einen text über das projekt und unsere gedanken dazu // wie ungefähr beim layout*/}
    </>
  );
}

export default Header;
