"use client";
// * basic
import { useState } from "react";

// * install libaries
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";

// * state
import { locationState } from "@/app/(protected)/_store/location";

// * components
import RegionFilterSelector from "./selector/Layout";

const Step1 = ({
    stepFlow,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: any) => {
    const location = useAtomValue(locationState);

    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center mt-3'>
                <h1 className='text-lg font-semibold'>
                    관심있는 지역이 있나요?
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    관심 지역을 자세하게 선택할수록 <br />
                    원하는 동네를 찾을 확률이 높아요.
                </p>
            </div>

            {/* contents */}
            <div>
                <RegionFilterSelector
                    selectedSido={selectedSido}
                    setSelectedSido={setSelectedSido}
                    selectedSigugun={selectedSigugun}
                    setSelectedSigugun={setSelectedSigugun}
                />
            </div>

            {/* buttons */}
            <div className='flex justify-end h-full items-end'>
                <Button
                    disabled={selectedSigugun === null}
                    className={[
                        selectedSigugun === null && "bg-gray-500",
                        "rounded-full px-6",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onClick={() => {
                        stepFlow.next();
                    }}
                >
                    다음
                </Button>
            </div>
        </div>
    );
};

export default Step1;
