"use client";

// * components
import MobileRegionMidpointHeader from "./Header";
import MobileRegionMidpointContent from "./Content";

const MobileRegionMidpointLayout = () => {
    return (
        <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
            {/* header */}
            <MobileRegionMidpointHeader />

            {/* content */}
            <MobileRegionMidpointContent />
        </div>
    );
};

export default MobileRegionMidpointLayout;
