require("babel-polyfill");
import React, { useEffect } from "react";
import {render} from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
// Styled compoenents imports
import { AppWrapper } from "./mainStyle.jsx";
import "./styles/animation.css"

const Popup = () => {

    const storedData = JSON.parse(localStorage.getItem('playground-response'));

    return (
        <BrowserRouter>
            <AppWrapper>
                <Routes>
                    <Route path="/home" element={<Home/>}/> 
                    <Route path="/popup.html" element={storedData?<Home/>:<Login/>}/>
                </Routes>
            </AppWrapper>
        </BrowserRouter>
    );
}

render(<Popup/>, document.getElementById("app"));
