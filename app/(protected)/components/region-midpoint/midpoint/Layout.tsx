"use client";

// * basic
import { useState } from "react";

// * components
import MidpointForm from "./Form";
import MidpointResult from "./Result";

const MidpointLayout = ({ stepFlow }: any) => {
    if (stepFlow.step === 0) {
        return <MidpointForm stepFlow={stepFlow} />;
    }

    if (stepFlow.step === 1) {
        return <MidpointResult stepFlow={stepFlow} />;
    }
};

export default MidpointLayout;
