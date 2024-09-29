"use client";

// * basic
import { useState } from "react";

// * components
import MobileRegionFilterHeader from "./Header";
import MobileRegionFilterContent from "./Content";

const MobileRegionFilterLayout = ({
    stepFlow,
    selectedSido,
    setSelectedSido,
    setSelectedSigungu,
}: any) => {
    return (
        <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
            {/* header */}
            <MobileRegionFilterHeader />

            {/* content */}
            <MobileRegionFilterContent
                stepFlow={stepFlow}
                selectedSido={selectedSido}
                setSelectedSido={setSelectedSido}
                setSelectedSigungu={setSelectedSigungu}
            />
        </div>
    );
};

export default MobileRegionFilterLayout;
