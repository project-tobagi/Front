"use client";

// * basic
import { useState } from "react";

// * components
import Stepper from "../common/Stepper";
import Step1 from "./step-1/Layout";
import Step2 from "./step-2/Layout";
import Step3 from "./step-3/Layout";

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

const RegionFilterLayout = () => {
    const stepFlow = useStepFlow();

    const stepTypes = [
        {
            label: "관심지역 설정",
            step: 0,
        },
        {
            label: "조건 설정",
            step: 1,
        },
        {
            label: "지역 탐색",
            step: 2,
        },
    ];
    return (
        <div className='w-[370px] h-[520px]'>
            <Stepper step={stepFlow.step} contents={stepTypes} lastStep={2} />
            {stepFlow.step === 0 ? (
                <Step1 stepFlow={stepFlow} />
            ) : stepFlow.step === 1 ? (
                <Step2 stepFlow={stepFlow} />
            ) : (
                <Step3 stepFlow={stepFlow} />
            )}
        </div>
    );
};

export default RegionFilterLayout;
