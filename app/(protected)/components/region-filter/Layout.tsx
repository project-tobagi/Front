"use client";

// * basic
import { useState } from "react";

// * components
import Stepper from "../common/Stepper";
import Step1 from "./step-1/Layout";
import Step2 from "./step-2/Layout";
import Step3 from "./step-3/Layout";

const RegionFilterLayout = () => {
    const [step, setStep] = useState(0);
    return (
        <div className='w-full'>
            <Stepper />
            {step === 0 ? (
                <Step1 setStep={setStep} />
            ) : step === 1 ? (
                <Step2 setStep={setStep} />
            ) : (
                <Step3 setStep={setStep} />
            )}
        </div>
    );
};

export default RegionFilterLayout;
