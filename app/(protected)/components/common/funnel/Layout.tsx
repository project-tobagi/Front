"use client";

// * basic
import { useState } from "react";

const useStepFlow = () => {
    const [step, setStep] = useState<number>(0);

    const next = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
    };

    const back = () => {
        setStep((prev) => (prev > 0 ? prev - 1 : 3));
    };

    return {
        step,
        next,
        back,
    };
};

const FunnelLayout = () => {
    return <div>funnelLayout</div>;
};

export default FunnelLayout;
