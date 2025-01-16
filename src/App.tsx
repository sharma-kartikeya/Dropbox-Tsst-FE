import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePage from "./pages/BasePage";

const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<BasePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default React.memo(App);