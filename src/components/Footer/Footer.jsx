import React from "react";
import Nav from "./Nav";
import Team from "./Team";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer>
      <Team />
      <br />
      <Nav />
      <br />
      <br />
      <Newsletter />
    </footer>
  );
}

export default Footer;
