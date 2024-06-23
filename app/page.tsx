"use client";

import { useState, useRef } from "react";
import HomePage from "./(protected)/(route)/home/page";
import { NavermapsProvider } from "react-naver-maps";

export default function Home() {
    return (
        <NavermapsProvider ncpClientId={process.env.NAVER_CLIENT_ID}>
            <HomePage />
        </NavermapsProvider>
    );
}
