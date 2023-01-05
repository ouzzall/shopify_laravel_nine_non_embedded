import {
    TopBar,
    ActionList,
    Icon,
    Frame,
} from "@shopify/polaris";
import React from "react";
import { QuestionMarkMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function CustomBar() {
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [userMenuActive, setUserMenuActive] = useState(false);

    const toggleUserMenuActive = useCallback(
        () => setUserMenuActive((userMenuActive) => !userMenuActive),
        []
    );

    const toggleIsSecondaryMenuOpen = useCallback(
        () =>
            setIsSecondaryMenuOpen(
                (isSecondaryMenuOpen) => !isSecondaryMenuOpen
            ),
        []
    );

    const handleSearchResultsDismiss = useCallback(() => {
        setIsSearchActive(false);
        setSearchValue("");
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
        setIsSearchActive(value.length > 0);
    }, []);

    const handleNavigationToggle = useCallback(() => {
        // console.log("HELLO");
        // console.log(mobileMenu);
    }, []);

    const logo = {
        width: 124,
        topBarSource: "",
        contextualSaveBarSource: "",
        url: "https://57cf-2400-adc5-1b3-b500-acce-75ac-d425-9450.in.ngrok.io/admin",
        accessibilityLabel: "Mystery Discount",
    };

    const userMenuActions = [
        {
            items: [{ content: <div>Profile</div> }],
        },
    ];

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name="Admin"
            detail="admin@gmail.com"
            initials="A"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );

    const searchResultsMarkup = (
        <ActionList items={[{ content: "Campaign's" }, { content: "Rule's" }]} />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Search"
            showFocusBorder
        />
    );

    const secondaryMenuMarkup = (
        <TopBar.Menu
            activatorContent={
                <span>
                    <Icon source={QuestionMarkMajor} />
                </span>
            }
            open={isSecondaryMenuOpen}
            onOpen={toggleIsSecondaryMenuOpen}
            onClose={toggleIsSecondaryMenuOpen}
            actions={[
                {
                    items: [{ content: "Community forums" }],
                },
            ]}
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}
            searchResultsVisible={isSearchActive}
            searchField={searchFieldMarkup}
            searchResults={searchResultsMarkup}
            onSearchResultsDismiss={handleSearchResultsDismiss}
            onNavigationToggle={handleNavigationToggle}
        />
    );

    return (
        <div style={{ height: "55px" }}>
            <Frame topBar={topBarMarkup} logo={logo} />
        </div>
    );
}

export default CustomBar;
