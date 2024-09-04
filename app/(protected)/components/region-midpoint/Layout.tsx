"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import _ from "lodash";

// * components
import MidpointLayout from "./midpoint/Layout";
import PlaceLayout from "./place/Layout";

const useStepFlow = () => {
    const [step, setStep] = useState<number>(0);

    const next = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
    };

    const back = () => {
        setStep((prev) => (prev > 0 ? prev - 1 : 3));
    };

    const reset = () => {
        setStep(0);
    };

    return {
        step,
        next,
        back,
        reset,
    };
};

const RegionMidpointLayout = () => {
    const stepFlow = useStepFlow();

    return (
        <div className='w-[370px] h-[520px]'>
            <MidpointLayout stepFlow={stepFlow} />
            <PlaceLayout stepFlow={stepFlow} />
        </div>
    );
};

export default RegionMidpointLayout;
