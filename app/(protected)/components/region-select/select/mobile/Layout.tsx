"use client";

// * components
import MobileRegionSelectHeader from "./Header";
import MobileRegionSelectContent from "./Content";
import { useState } from "react";

interface RegionSelect {
    loading: any;
    setLoading: any;
    setOpen: any;
    selectedSido: {
        si: string;
        guList: any;
    };
    selectedSigugun: {
        gu: string;
        dongList: any;
    };
    selectedDong: {
        dong: string;
        code: string;
    };
    setSelectedSido: any;
    setSelectedSigugun: any;
    setSelectedDong: any;
}

const MobileRegionSelect = ({
    loading,
    setLoading,
    setOpen,
    selectedSido,
    selectedSigugun,
    selectedDong,
    setSelectedSido,
    setSelectedSigugun,
    setSelectedDong,
}: RegionSelect) => {
    const [step, setStep] = useState(0);
    return (
        <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
            {/* header */}
            <MobileRegionSelectHeader setOpen={setOpen} />

            {/* content */}
            <MobileRegionSelectContent
                loading={loading}
                setLoading={setLoading}
                step={step}
                setStep={setStep}
                setOpen={setOpen}
                selectedSido={selectedSido}
                selectedSigugun={selectedSigugun}
                selectedDong={selectedDong}
                setSelectedSido={setSelectedSido}
                setSelectedSigugun={setSelectedSigugun}
                setSelectedDong={setSelectedDong}
            />
        </div>
    );
};

export default MobileRegionSelect;
