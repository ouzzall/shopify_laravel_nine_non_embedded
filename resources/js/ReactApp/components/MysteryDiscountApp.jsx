import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import { Route, Routes } from "react-router-dom";
import CustomBar from "./CustomBar";
// import NavigationCustom from "./NavigationCustom";

import Loading from "./Loading";
import Campaign from "./Campaign";
import Dashboard from "./Dashboard";
import NewCampaign from "./NewCampaign";
import React from "react";
import EditCampaign from "./EditCampaign";

const MysteryDiscountApp = () => {
    return (
        <AppProvider i18n={en}>
            <CustomBar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/campaigns" element={<Campaign />} />
                <Route path="/edit-campaign/:id" element={<EditCampaign />} />
                <Route path="/new-campaign" element={<NewCampaign />} />
                <Route path="*" element={<Loading login={false} />} />
            </Routes>
        </AppProvider>
    );
};

export default MysteryDiscountApp;
