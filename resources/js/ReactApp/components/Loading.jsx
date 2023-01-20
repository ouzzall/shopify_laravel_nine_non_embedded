import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Frame, Loading as ShopLoading } from '@shopify/polaris';
import React from "react";
const Loading = () => {

    const navigate = useNavigate();

    useEffect(() => {

        if(typeof shopNm !== 'undefined')
            navigate("/embedded-screen");
        else
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
