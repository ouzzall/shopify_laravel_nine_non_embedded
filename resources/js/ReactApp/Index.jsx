import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MysteryDiscountApp from "./components/MysteryDiscountApp";

export default function ReactApp() {
    return (
        <BrowserRouter>
            <MysteryDiscountApp />
        </BrowserRouter>
    );
}

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(<ReactApp />);
}
