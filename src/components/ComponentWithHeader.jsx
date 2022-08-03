import React from "react";
import {Outlet} from "react-router-dom";
import {Header} from "./index";


const ComponentWithHeader = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default ComponentWithHeader;
