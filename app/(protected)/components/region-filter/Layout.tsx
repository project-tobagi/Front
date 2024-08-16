"use client";

// * basic
import { useState } from "react";

// * components
import Stepper from "../common/Stepper";
import Step1 from "./step-1/Layout";
import Step2 from "./step-2/Layout";
import Step3 from "./step-3/Layout";

const RegionFilterLayout = () => {
    const [step, setStep] = useState(1);

    const stepTypes = [
        {
            label: "관심지역 설정",
            step: 1,
        },
        {
            label: "조건 설정",
            step: 2,
        },
        {
            label: "지역 탐색",
            step: 3,
        },
    ];
    return (
        <div className='w-[370px]'>
            <Stepper step={step} contents={stepTypes} lastStep={3} />
            {step === 1 ? (
                <Step1 setStep={setStep} />
            ) : step === 2 ? (
                <Step2 setStep={setStep} />
            ) : (
                <Step3 setStep={setStep} />
            )}
        </div>
    );
};

export default RegionFilterLayout;
