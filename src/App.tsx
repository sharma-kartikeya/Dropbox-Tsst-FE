import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePage from "./pages/BasePage";
import { useLazyGetUserStateQuery } from "./redux/network";

const App: React.FunctionComponent = () => {

    const [triggerUserStateCall] = useLazyGetUserStateQuery()

    useEffect(() => {
        console.log('App mounted');
        triggerUserStateCall(null);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<BasePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default React.memo(App);