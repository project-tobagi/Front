"use client";

// * install libaries
import { Button } from "@/components/ui/button";
import _ from "lodash";
import { useAtom } from "jotai";

// * state
import { filteredRegionListState } from "@/app/(protected)/_store/region";

// * components
import RegionFilterSliders from "./Sliders";
import { useState } from "react";

// * etc
import { CONDITION_TYPES } from "@/app/(protected)/_utils/constants";
import { API_RANK_INFO, API_RESION_POLYGON } from "@/app/(protected)/_api";

const Step2 = ({
    stepFlow,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: any) => {
    const [conditions, setConditions] = useState(CONDITION_TYPES);
    const [filteredRegionList, setFilteredRegionList] = useAtom(
        filteredRegionListState
    );

    const filterParams = () => {
        const activeOptions = _.filter(
            conditions,
            (condition) => condition.active
        );
        let params = { donGrpCd: selectedSigugun.code.slice(0, 5) };

        _.forEach(activeOptions, (item: any) => {
            params = { ...params, [item.code]: item.value };
        });

        return params;
    };

    // 필터에 해당되는 동네 찾기
    const handleClickFilterRegion = async () => {
        try {
            const res = await API_RANK_INFO(filterParams());
            if (res !== null && res !== undefined) {
                setFilteredRegionList(() => {
                    return _.map(
                        _.groupBy(res.data, "donCd"),
                        (list, label) => ({
                            label: _.find(selectedSigugun.dongList, (dong) => {
                                return (
                                    _.slice(dong.code, 0, 8).join("") === label
                                );
                            })?.dong,
                            list,
                        })
                    );
                });

                stepFlow.next();
            }
        } catch {
            console.log("동네 필터 실패");
        }
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
                        handleClickFilterRegion();
                    }}
                >
                    탐색
                </Button>
            </div>
        </div>
    );
};

export default Step2;
