"use client";

// * basic
import { useState } from "react";

// * install libraries
import { useAtom, useAtomValue } from "jotai";
import _ from "lodash";

// * state
import {
    filteredRegionListState,
    polygonState,
    regionDataState,
} from "@/app/(protected)/_store/region";

// * components
import RegionFilterSliders from "../step-2/Sliders";
import Icon from "../../common/Icon";
import Descriptions from "../../region-midpoint/Descriptions";
import { ScrollArea } from "@/components/ui/scroll-area";

// * etc
import { CONDITION_TYPES } from "@/app/(protected)/_utils/constants";
import { API_RANK_INFO, API_RESION_POLYGON } from "@/app/(protected)/_api";
import { generateRegionRank } from "@/app/(protected)/_utils/rank";
import { locationState } from "@/app/(protected)/_store/location";

const MobileRegionFilterContent = ({
    stepFlow,
    loading,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: any) => {
    const regionData = useAtomValue(regionDataState);
    const [conditions, setConditions] = useState(CONDITION_TYPES);
    const [filteredRegionList, setFilteredRegionList] = useAtom(
        filteredRegionListState
    );

    const [, setLocation]: any = useAtom<any>(locationState);
    if (loading) {
        return <div>로딩중...</div>;
    }

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
                    let index = 0;
                    return _.map(
                        _.groupBy(res.data, "donCd"),
                        (list: any, label: any) => {
                            const result = {
                                label:
                                    _.find(
                                        selectedSigugun.dongList,
                                        (dong: any) => {
                                            return (
                                                _.slice(dong.code, 0, 8).join(
                                                    ""
                                                ) === label
                                            );
                                        }
                                    )?.dong ||
                                    selectedSigugun.dongList[index]?.dong ||
                                    "알 수 없는 동",
                                list,
                            };
                            index++;
                            return result;
                        }
                    );
                });
                stepFlow.next();
            }
        } catch {
            console.log("동네 필터 실패");
        }
    };

    const handleClickDetailRegion = async (item: any) => {
        try {
            stepFlow.next();
            setLocation({
                sido: selectedSido.si,
                sigugun: selectedSigugun.gu,
                dong: item.label,
                code: `${item.value[0].donCd}00`,
            });
        } catch {}
    };

    // 동네찾기 할 지역 설정 (시, 시군구)
    if (stepFlow.step === 0) {
        return (
            <div className='h-full mt-16 pb-[250px]'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 지역은 어디인가요?'
                        subTitle=''
                    />
                    <ul className='h-full overflow-y-auto mx-3 my-1'>
                        {_.map(regionData, (data: any, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className='p-4 hover:bg-gray-100 max-lg:text-xs hover:text-[11px] rounded-xl cursor-pointer'
                                    onClick={() => {
                                        stepFlow.next();
                                        setSelectedSido(data);
                                    }}
                                >
                                    {data.si}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    if (stepFlow.step === 1) {
        return (
            <div className='h-[calc(100%-250px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 시/군/구는 어디인가요?'
                        subTitle=' 자세하게 선택할수록 원하는 동네를 찾을 확률이
                            높아져요!'
                    />

                    <ul className='h-[calc(100%-60px)] overflow-y-auto mx-3 my-1'>
                        {_.map(
                            selectedSido.guList,
                            (data: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className='p-4 hover:bg-gray-100 max-lg:text-xs hover:text-[11px] rounded-xl cursor-pointer'
                                        onClick={() => {
                                            stepFlow.next();
                                            setSelectedSigugun(data);
                                        }}
                                    >
                                        {data.gu}
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    // 생활편의, 치안 등 조건설정
    if (stepFlow.step === 2) {
        return (
            <div className='h-[calc(100%-250px)] mt-16 overflow-y-auto'>
                <Descriptions
                    title='중요하게 생각하는 동네의 조건을 설정해주세요.'
                    subTitle=''
                />
                <div className='px-8 py-6'>
                    <RegionFilterSliders
                        conditions={conditions}
                        setConditions={setConditions}
                    />
                </div>

                <div className='px-4 fixed bottom-24 left-0 right-0 '>
                    <button
                        onClick={() => {
                            handleClickFilterRegion();
                        }}
                        className='w-full py-2 bg-black rounded-lg mt-4 text-white'
                    >
                        동네 찾기
                    </button>
                </div>
            </div>
        );
    }

    // 동네찾기 결과
    if (stepFlow.step === 3) {
        return (
            <ScrollArea className='h-[calc(100%-250px)]  overflow-y-auto mt-16 '>
                <Descriptions
                    title=' 동네 탐색을 완료했어요!'
                    subTitle='설정한 조건에 일치하는 동네 탐색을 완료했어요.
                            동네별 요약 정보를 확인해보세요!'
                />
                <div className='p-5 '>
                    <div>
                        <ul className='grid gap-3 text-sm'>
                            {_.map(
                                generateRegionRank(filteredRegionList),
                                (item: any, index: number) => {
                                    return (
                                        <li
                                            key={`region-${index}`}
                                            onClick={() => {
                                                handleClickDetailRegion(item);
                                            }}
                                            className='w-full min-h-32 ring-1 ring-gray-300 hover:ring-black rounded-lg p-4 flex flex-col gap-6 cursor-pointer'
                                        >
                                            <div className='flex gap-2'>
                                                <h1 className='bg-black rounded-full text-white px-2'>
                                                    {item.label}
                                                </h1>
                                                <p className='text-gray-500'>
                                                    {selectedSido.si +
                                                        "" +
                                                        selectedSigugun.gu}
                                                </p>
                                            </div>

                                            <div className=''>
                                                <ul className='flex flex-col gap-3 text-xs '>
                                                    {_.map(
                                                        item.value,
                                                        (data: any) => {
                                                            return (
                                                                <li
                                                                    key={`description-${data.rank}`}
                                                                    className='flex gap-2'
                                                                >
                                                                    <Icon
                                                                        type={
                                                                            data.rank ===
                                                                            3
                                                                                ? "ic_bad"
                                                                                : data.rank ===
                                                                                  2
                                                                                ? "ic_soso"
                                                                                : "ic_good"
                                                                        }
                                                                    />
                                                                    <p>
                                                                        {_.map(
                                                                            data.category,
                                                                            (
                                                                                cate: any
                                                                            ) => {
                                                                                return (
                                                                                    cate +
                                                                                    ", "
                                                                                );
                                                                            }
                                                                        )}
                                                                    </p>
                                                                    <p>
                                                                        지수가
                                                                        {"'" +
                                                                            data.rankTxt +
                                                                            "'"}
                                                                        이에요.
                                                                    </p>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>

                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
            </ScrollArea>
        );
    }
};

export default MobileRegionFilterContent;
