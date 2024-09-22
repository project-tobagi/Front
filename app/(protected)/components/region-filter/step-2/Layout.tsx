"use client";

// * install libaries
import { Button } from "@/components/ui/button";

// * components
import RegionFilterSliders from "./Sliders";
import { useState } from "react";

const Step2 = ({ stepFlow }: any) => {
    const sliderTypes = [
        {
            id: 1,
            label: "편의시설",
            value: 1,
            active: false,
        },
        {
            id: 2,
            label: "치안",
            value: 1,
            active: false,
        },
        {
            id: 3,
            label: "문화시설",
            value: 1,
            active: false,
        },
        {
            id: 4,
            label: "맛집",
            value: 1,
            active: false,
        },
        {
            id: 5,
            label: "교통",
            value: 1,
            active: false,
        },
        {
            id: 6,
            label: "생활 인프라",
            value: 1,
            active: false,
        },
    ];

    const [conditions, setConditions] = useState(sliderTypes);

    // * 탐색하기
    const handleClickFilterRegion = async () => {
        // await API_STATION_STATUS();
    };

    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center  mt-3'>
                <h1 className='text-lg font-semibold'>
                    관심있는 동네의 조건이 있나요?
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    중요하게 생각하는 동네의 조건을 설정해보세요. <br />
                    중요도를 자세하게 설정할수록 원하는 동네를 찾을 확률이
                    높아져요!
                </p>
            </div>

            {/* contents */}
            <div>
                <RegionFilterSliders
                    conditions={conditions}
                    setConditions={setConditions}
                />
            </div>

            {/* buttons */}
            <div className='h-full flex justify-between items-end'>
                <Button
                    variant='outline'
                    className='rounded-full px-6'
                    onClick={() => {
                        stepFlow.back();
                    }}
                >
                    뒤로
                </Button>
                <Button
                    className='rounded-full px-6'
                    onClick={() => {
                        stepFlow.next();
                    }}
                >
                    탐색
                </Button>
            </div>
        </div>
    );
};

export default Step2;
