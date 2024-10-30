"use client";

// * basic
import { useEffect } from "react";

// * install libraries
import { useAtom } from "jotai";

// * state
import { overlayVisibleState } from "@/app/(protected)/_store/visible";

// * components
import MobileRegionMidpointHeader from "./Header";
import MobileRegionMidpointContent from "./Content";
import Icon from "../../common/Icon";

const MobileRegionMidpointLayout = ({
    stepFlow,
    placeResult,
    setPlaceResult,
}: any) => {
    const [, setOverlayVisible] = useAtom(overlayVisibleState);

    useEffect(() => {
        setOverlayVisible(stepFlow.step !== 4);
    }, [stepFlow.step]);

    if (stepFlow.step !== 4) {
        return (
            <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden'>
                {/* header */}
                <MobileRegionMidpointHeader stepFlow={stepFlow} />

                {/* content */}
                <MobileRegionMidpointContent
                    stepFlow={stepFlow}
                    placeResult={placeResult}
                    setPlaceResult={setPlaceResult}
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

export default MobileRegionMidpointLayout;
