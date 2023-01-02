import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Frame, Loading as ShopLoading } from '@shopify/polaris';
import React from "react";
const Loading = ({ login }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    },[]);

    return (
    <div style={{display:"block",marginTop:"-55px"}}>
        <Frame>
            <ShopLoading />
        </Frame>
    </div>
    )
}

export default Loading;
