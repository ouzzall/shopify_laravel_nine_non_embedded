import { useState } from 'react'
import "./css/toggle.css";
import React from "react";
export const Toggle = ({ label, toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <div id='customToggle'>
            <label>
                <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
                <span />
                <strong>{label}</strong>
            </label>
        </div>
    )
}
export default Toggle;
