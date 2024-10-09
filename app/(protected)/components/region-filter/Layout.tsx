"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import { useMediaQuery } from "react-responsive";

// * components
import Stepper from "../common/Stepper";
import Step1 from "./step-1/Layout";
import Step2 from "./step-2/Layout";
import Step3 from "./step-3/Layout";
import MobileRegionFilterLayout from "./mobile/Layout";

const useStepFlow = () => {
    const [step, setStep] = useState<number>(0);

    const next = () => {
        setStep((prev) => (prev < 4 ? prev + 1 : 0));
    };

    const back = () => {
        setStep((prev) => (prev > 0 ? prev - 1 : 4));
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

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    const [selectedSido, setSelectedSido] = useState<any>(null);
    const [selectedSigugun, setSelectedSigugun] = useState<any>(null);

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

    if (isDesktopOrLaptop) {
        return (
            <div className='w-[370px] h-[520px]'>
                <div className='h-full'>
                    <Stepper
                        step={stepFlow.step}
                        contents={stepTypes}
                        lastStep={2}
                    />
                    {stepFlow.step === 0 ? (
                        <Step1
                            stepFlow={stepFlow}
                            selectedSido={selectedSido}
                            selectedSigugun={selectedSigugun}
                            setSelectedSido={setSelectedSido}
                            setSelectedSigugun={setSelectedSigugun}
                        />
                    ) : stepFlow.step === 1 ? (
                        <Step2
                            stepFlow={stepFlow}
                            selectedSigugun={selectedSigugun}
                        />
                    ) : (
                        <Step3
                            stepFlow={stepFlow}
                            selectedSido={selectedSido}
                            selectedSigugun={selectedSigugun}
                        />
                    )}
                </div>
            </div>
        );
    }

    if (isMobile) {
        return (
            <MobileRegionFilterLayout
                stepFlow={stepFlow}
                selectedSido={selectedSido}
                setSelectedSido={setSelectedSido}
                selectedSigugun={selectedSigugun}
                setSelectedSigugun={setSelectedSigugun}
            />
        );
    }
};

export default RegionFilterLayout;
