import React from "react";
import PlatformRoutes from "../Navigation/navbar/PlatformRoutes";
import PcGamesFetch from "../../apis/PcGamesFetch";
import Header from "../PageLayout/Header/Header";

function PC() {
  return (
    <>
      <Header />
      <div>
        <PcGamesFetch />
      </div>
    </>
  );
}

export default PC;
