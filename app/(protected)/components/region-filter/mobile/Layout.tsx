"use client";

// * basic
import { useState, useEffect } from "react";

// * components
import MobileRegionFilterHeader from "./Header";
import MobileRegionFilterContent from "./Content";
import Bottom from "../../layout/Bottom";
import Icon from "../../common/Icon";
import { useAtom, useAtomValue } from "jotai";
import { overlayVisibleState } from "@/app/(protected)/_store/visible";
import Descriptions from "../../region-midpoint/Descriptions";

const MobileRegionFilterLayout = ({
    stepFlow,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: any) => {
    const [, setOverlayVisible] = useAtom(overlayVisibleState);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    // '관심있는 지역은 어디인가요?'
    useEffect(() => {
        setOverlayVisible(stepFlow.step !== 4);

        switch (stepFlow.step) {
            case 0:
                setTitle("관심있는 지역은 어디인가요?");
                setSubTitle("");
                break;
            case 1:
                setTitle("관심있는 시/군/구는 어디인가요?");
                setSubTitle(
                    "자세하게 선택할수록 원하는 동네를 찾을 확률이 높아져요!"
                );
                break;
            case 2:
                setTitle("중요하게 생각하는 동네의 조건을 설정해주세요.");
                setSubTitle("");
                break;
            case 3:
                setTitle("동네 탐색을 완료했어요!");
                setSubTitle(
                    "설정한 조건에 일치하는 동네 탐색을 완료했어요. 동네별 요약 정보를 확인해보세요!"
                );
        }
    }, [stepFlow.step]);
    if (stepFlow.step !== 4) {
        return (
            <div className='absolute top-0 left-0 bg-white w-screen h-screen overflow-hidden flex flex-col'>
                {/* header */}
                <MobileRegionFilterHeader stepFlow={stepFlow} />
                <Descriptions title={title} subTitle={subTitle} />
                {/* content */}
                <MobileRegionFilterContent
                    stepFlow={stepFlow}
                    selectedSido={selectedSido}
                    setSelectedSido={setSelectedSido}
                    selectedSigugun={selectedSigugun}
                    setSelectedSigugun={setSelectedSigugun}
                />
                {/* bottom */}
                {/* <Bottom /> */}
            </div>
        );
    } else {
        return (
            <div
                onClick={() => {
                    stepFlow.back();
                }}
                className='cursor-pointer absolute bottom-[105px] right-4 bg-[#03a2ff] rounded-full px-5 py-2.5'
            >
                <div className='flex items-center gap-2 text-white'>
                    <Icon type='ic_list' />
                    <h1>목록보기</h1>
                </div>
            </div>
        );
    }
};

export default MobileRegionFilterLayout;
