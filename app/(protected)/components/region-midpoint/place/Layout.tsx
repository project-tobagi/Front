"use client";

// * basic
import { useState } from "react";

// * install libraries
import { useAtomValue } from "jotai";
import { toast } from "react-toastify";

// * components
import PlaceCategory from "./Category";
import PlaceResult from "./Result";

// * state
import { midPointState } from "@/app/(protected)/_store/location";

// * etc
import { getNearestPlace } from "@/app/(protected)/_utils/midpoint";

const PlaceLayout = ({ stepFlow }: any) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [placeResult, setPlaceResult] = useState(null);
    const midpoint = useAtomValue<any>(midPointState);

    const handleClickFindMidpointPlace = async () => {
        const response = await getNearestPlace(
            midpoint.lat,
            midpoint.lng,
            toast,
            selectedCategory
        );

        if (response) {
            setPlaceResult(response);
        }
    };

    if (stepFlow.step === 2) {
        return (
            <PlaceCategory
                stepFlow={stepFlow}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                handleClickFindMidpointPlace={handleClickFindMidpointPlace}
            />
        );
    }

    if (stepFlow.step === 3) {
        return (
            <PlaceResult
                stepFlow={stepFlow}
                selectedCategory={selectedCategory}
                placeResult={placeResult}
            />
        );
    }
};

export default PlaceLayout;
