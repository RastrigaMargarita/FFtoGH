import React from "react";
import { LogoLoader } from "../SVG";

const HeaderLoader = (props) => {
  return (
    <div style={{ paddingTop: props.paddingTop }}>
      <LogoLoader />
    </div>
  );
};

export default HeaderLoader;
