"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-toastify";
import _ from "lodash";

// * components
import PlaceCategory from "./Category";
import PlaceResult from "./Result";

// * state
import { midPointState } from "@/app/(protected)/_store/location";
import { menuState } from "@/app/(protected)/_store/menu";

// * etc
import { getNearestPlace } from "@/app/(protected)/_api/map";

const PlaceLayout = ({ stepFlow, placeResult, setPlaceResult }: any) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [filterCategory, setFilterCategory] = useState<any>(null);
    const midpoint = useAtomValue<any>(midPointState);

    const handleClickFindMidpointPlace = async () => {
        const mpPlace = await Promise.all(
            _.map(
                selectedCategory,
                (category: { type: string; code: string }) => {
                    return getNearestPlace(
                        midpoint.lat,
                        midpoint.lng,
                        toast,
                        category.code
                    );
                }
            )
        );

        if (mpPlace.length > 0) {
            setPlaceResult(_.flatten(mpPlace));
        } else {
            toast.error("결과가 존재하지 않습니다.");
        }
    };

    // 스텝 0 일경우 선택한 카테고리 초기화
    useEffect(() => {
        if (stepFlow.step === 0) {
            setSelectedCategory([]);
        }
    }, [stepFlow.step]);

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
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
            />
        );
    }
};

export default PlaceLayout;
