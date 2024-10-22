"use client";

// * install libraries
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";

// * state
import { filteredRegionListState } from "@/app/(protected)/_store/region";
import { locationState } from "@/app/(protected)/_store/location";

// * components
import RegionCard from "./RegioCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// * etc
import { generateRegionRank } from "@/app/(protected)/_utils/rank";

const Step3 = ({ stepFlow, selectedSido, selectedSigugun }: any) => {
    const [filteredRegionList, setFilteredRegionList] = useAtom(
        filteredRegionListState
    );
    const [, setLocation]: any = useAtom<any>(locationState);

    const handleClickDetailRegion = async (item: any) => {
        try {
            // stepFlow.next();
            setLocation({
                sido: selectedSido.si,
                sigugun: selectedSigugun.gu,
                dong: item.label,
                code: `${item.value[0].donCd}00`,
            });
        } catch {}
    };
    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center mt-3'>
                <h1 className='text-lg font-semibold'>
                    동네 탐색을 완료했어요!
                </h1>
                <p className='text-sm text-gray-400'>
                    설정한 조건에 일치하는 동네 탐색을 완료했어요. 동네별 요약
                    정보를 확인해보세요!
                </p>
            </div>

            {/* contents */}
            <ScrollArea className='h-full'>
                {_.map(
                    generateRegionRank(filteredRegionList),
                    (item: any, index: number) => {
                        return (
                            <RegionCard
                                key={`region-${index}`}
                                item={item}
                                index={index}
                                selectedSido={selectedSido}
                                selectedSigugun={selectedSigugun}
                                handleClickDetailRegion={
                                    handleClickDetailRegion
                                }
                            />
                        );
                    }
                )}

                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
            </ScrollArea>
            {/* buttons */}
            <div className='flex justify-center items-end'>
                <Button
                    className='rounded-full px-6'
                    onClick={() => {
                        stepFlow.reset();
                    }}
                >
                    다시하기
                </Button>
            </div>
        </div>
    );
};

export default Step3;
