"use client";

// * components
import MobileRegionFilterHeader from "./Header";
import MobileRegionFilterContent from "./Content";

const MobileRegionFilterLayout = () => {
    return (
        <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
            {/* header */}
            <MobileRegionFilterHeader />

            {/* content */}
            <MobileRegionFilterContent />
        </div>
    );
};

export default MobileRegionFilterLayout;
