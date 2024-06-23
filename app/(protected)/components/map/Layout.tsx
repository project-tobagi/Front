"use client";

import React, { useEffect } from "react";

import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

const NaverMapLayout = () => {
    return (
        <div className=''>
            <MapDiv className='h-[200px] w-[200px]'>
                <NaverMap>
                    <Marker
                        defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }}
                    />
                </NaverMap>
            </MapDiv>
        </div>
    );
};

export default NaverMapLayout;
