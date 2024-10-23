"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import _ from "lodash";
import { useMediaQuery } from "react-responsive";

// * components
import MidpointLayout from "./midpoint/Layout";
import PlaceLayout from "./place/Layout";
import MobileRegionMidpointLayout from "./mobile/Layout";
import { ColorRing } from "react-loader-spinner";

const useStepFlow = () => {
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const next = () => {
        setStep((prev) => (prev < 4 ? prev + 1 : 0));
    };

    const back = () => {
        setStep((prev) => (prev > 0 ? prev - 1 : 4));
    };

    const reset = () => {
        setStep(0);
    };

    const loadingStart = () => {
        setLoading(true);
    };

    const loadingEnd = () => {
        setLoading(false);
    };

    return {
        step,
        next,
        back,
        reset,
        loadingStart,
        loadingEnd,
        loading,
    };
};

const RegionMidpointLayout = () => {
    const stepFlow = useStepFlow();
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    const [placeResult, setPlaceResult] = useState(null);

    if (isDesktopOrLaptop) {
        return (
            <div className='flex h-[520px] max-lg:h-full max-lg:justify-center max-lg:w-full'>
                <div className='w-[370px] h-full relative'>
                    {stepFlow.loading && (
                        <div className='absolute size-full flex items-center justify-center z-50'>
                            <ColorRing
                                visible={true}
                                height='100'
                                width='100'
                                ariaLabel='color-ring-loading'
                                wrapperStyle={{}}
                                wrapperClass='color-ring-wrapper'
                                colors={[
                                    "#e15b64",
                                    "#f47e60",
                                    "#f8b26a",
                                    "#abbd81",
                                    "#849b87",
                                ]}
                            />
                        </div>
                    )}

                    <MidpointLayout stepFlow={stepFlow} />
                    <PlaceLayout
                        stepFlow={stepFlow}
                        placeResult={placeResult}
                        setPlaceResult={setPlaceResult}
                    />
                </div>
            </div>
        );
    }

    if (isMobile) {
        return (
            <MobileRegionMidpointLayout
                stepFlow={stepFlow}
                placeResult={placeResult}
                setPlaceResult={setPlaceResult}
            />
        );
    }
};

export default RegionMidpointLayout;
