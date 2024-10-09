"use client";

// * basic
import { useState, useEffect } from "react";

// * components
import MobileRegionFilterHeader from "./Header";
import MobileRegionFilterContent from "./Content";
import Icon from "../../common/Icon";
import { useAtom, useAtomValue } from "jotai";
import { overlayVisibleState } from "@/app/(protected)/_store/visible";

const MobileRegionFilterLayout = ({
    stepFlow,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: any) => {
    const [, setOverlayVisible] = useAtom(overlayVisibleState);

    useEffect(() => {
        setOverlayVisible(stepFlow.step !== 4);
    }, [stepFlow.step]);
    if (stepFlow.step !== 4) {
        return (
            <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
                {/* header */}
                <MobileRegionFilterHeader stepFlow={stepFlow} />

                {/* content */}
                <MobileRegionFilterContent
                    stepFlow={stepFlow}
                    selectedSido={selectedSido}
                    setSelectedSido={setSelectedSido}
                    selectedSigugun={selectedSigugun}
                    setSelectedSigugun={setSelectedSigugun}
                />
            </div>
        );
    } else {
        return (
            <div
                onClick={() => {
                    stepFlow.back();
                }}
                className='cursor-pointer absolute bottom-[105px] right-4 bg-[#03a2ff] rounded-full px-5 py-2.5'
            >
                <div className='flex items-center gap-2 text-white'>
                    <Icon type='ic_list' />
                    <h1>목록보기</h1>
                </div>
            </div>
        );
    }
};

export default MobileRegionFilterLayout;
