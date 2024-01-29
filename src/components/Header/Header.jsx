import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Account from "./Account";
import SearchBox from "./Search";

function Header() {
  return (
    <>
      <header>
        <Logo />
        {/* <SearchBox /> */}
        <Nav />
        <Account />
      </header>
      <SearchBox />
    </>
  );
}

export default Header;
