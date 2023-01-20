import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CustomBar from "./CustomBar";

import Loading from "./Loading";
import Campaign from "./Campaign";
import Dashboard from "./Dashboard";
import NewCampaign from "./NewCampaign";
import React, { useEffect, useState } from "react";
import EditCampaign from "./EditCampaign";
import Settings from "./Settings";
import Login from "./login";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import EmbeddedApp from "./EmbeddedApp";

const MysteryDiscountApp = () => {

    let location = useLocation();

    const [topBarCheck, setTopBarCheck] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const getUser = async () => {

            const data = await fetch('/getSession');
            const response = await data.json();

            if (!response.success) {

                if(typeof shopNm !== 'undefined') {
                    if(location.pathname != "/embedded-screen" ) {
                        navigate("/embedded-screen");
                    }
                }

                else if(location.pathname != '/forget-password' && location.pathname != '/reset-password' ) {
                    if(location.pathname != "/login" ) {
                        navigate("/login");
                    }
                }

            } else {

                setTopBarCheck(true);

                if(location.pathname == '/forget-password' || location.pathname == '/reset-password' || location.pathname == '/login' ) {
                    if(location.pathname != "/" ) {
                        navigate("/");
                    }
                }
            }
        }
        getUser();
    },[location]);

    return (
        <AppProvider i18n={en}>
            {topBarCheck && <CustomBar /> }
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/" element={<Dashboard />} />
                <Route path="/campaigns" element={<Campaign />} />
                <Route path="/edit-campaign/:id" element={<EditCampaign />} />
                <Route path="/new-campaign" element={<NewCampaign />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/embedded-screen" element={<EmbeddedApp /> } />
                <Route path="*" element={<Loading /> } />
            </Routes>
        </AppProvider>
    );
};

export default MysteryDiscountApp;
