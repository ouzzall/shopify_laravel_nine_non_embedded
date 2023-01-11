import { Card, Tabs } from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TabsExample() {
    //
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        // console.log(location.pathname);

        if(location.pathname == "/") {
            setSelected(0);
        } else if(location.pathname == "/campaigns") {
            setSelected(1);
        } else if(location.pathname == "/new-campaign") {
            setSelected(2);
        }
    }, [location]);

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback((selectedTabIndex) => {
        setSelected(selectedTabIndex);

        if (selectedTabIndex == 0) {
            navigate("/");
        } else if (selectedTabIndex == 1) {
            navigate("/campaigns");
        } else if (selectedTabIndex == 2) {
            navigate("/new-campaign");
        }
    }, []);

    const tabs = [
        {
            id: "all-customers-1",
            content: "Dashboard",
        },
        {
            id: "accepts-marketing-1",
            content: "Campaigns",
        },
        {
            id: "repeat-customers-1",
            content: "New Campaign +",
        },
    ];

    return (
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
    );
}

export default TabsExample;
