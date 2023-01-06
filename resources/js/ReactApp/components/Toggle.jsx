import { useState } from 'react'
import "./css/toggle.css";
import React from "react";
export const Toggle = ({ label, toggled, onClick }) => {

    return (
        <div id='customToggle'>
            <label>
                <input type="checkbox" checked={toggled} onClick={onClick} />
                <span />
                <strong>{label}</strong>
            </label>
        </div>
    )
}
export default Toggle;
