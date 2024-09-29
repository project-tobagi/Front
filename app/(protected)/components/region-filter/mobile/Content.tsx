"use client";

// * basic
import { useState } from "react";

// * install libraries
import { useAtomValue } from "jotai";
import _ from "lodash";

// * state
import { regionDataState } from "@/app/(protected)/_store/region";

// * components
import RegionFilterSliders from "../step-2/Sliders";
import Icon from "../../common/Icon";
import Descriptions from "../../region-midpoint/Descriptions";

// * etc
import { CONDITION_TYPES } from "@/app/(protected)/_utils/constants";

const MobileRegionFilterContent = ({
    stepFlow,
    loading,
    selectedSido,
    setSelectedSido,
    setSelectedSigugun,
}: any) => {
    const regionData = useAtomValue(regionDataState);
    const [conditions, setConditions] = useState(CONDITION_TYPES);
    if (loading) {
        return <div>로딩중...</div>;
    }

    // 동네찾기 할 지역 설정 (시, 시군구)
    if (stepFlow.step === 0) {
        return (
            <div className='h-[calc(100%-200px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 지역은 어디인가요?'
                        subTitle=''
                    />
                    <ul className='h-[calc(100%-80px)] overflow-y-auto mx-3 my-1'>
                        {_.map(regionData, (data: any, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className='p-4 hover:bg-gray-100 hover:text-[15px] rounded-xl cursor-pointer'
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
            <div className='h-[calc(100%-200px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 시/군/구는 어디인가요?'
                        subTitle=' 자세하게 선택할수록 원하는 동네를 찾을 확률이
                            높아져요!'
                    />

                    <ul className='h-[calc(100%-80px)] overflow-y-auto mx-3 my-1'>
                        {_.map(
                            selectedSido.guList,
                            (data: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className='p-4 hover:bg-gray-100 hover:text-[15px] rounded-xl cursor-pointer'
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
            <div className='h-[calc(100%-200px)] mt-16 overflow-y-auto'>
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
                            stepFlow.next();
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
            <div className='h-[calc(100%-200px)] mt-16'>
                <Descriptions
                    title=' 동네 탐색을 완료했어요!'
                    subTitle='설정한 조건에 일치하는 동네 탐색을 완료했어요.
                            동네별 요약 정보를 확인해보세요!'
                />
                <div className='p-5'>
                    <div>
                        <ul>
                            {/* 반복문 사용할 곳 */}
                            <li className='w-full h-44 ring-1 ring-gray-300 rounded-lg p-4 flex flex-col gap-6'>
                                <div className='flex gap-2'>
                                    <h1 className='bg-black rounded-full text-white px-2'>
                                        예관동
                                    </h1>
                                    <p className='text-gray-500'>
                                        서울특별시 중구
                                    </p>
                                </div>

                                <div>
                                    <ul className='flex flex-col gap-3 text-sm'>
                                        <li className='flex gap-2'>
                                            <Icon type='ic_good' />
                                            %대중교통, 맛집, 편의시설% 지수가
                                            ‘상’이에요.
                                        </li>
                                        <li className='flex gap-2'>
                                            <Icon type='ic_soso' />
                                            %대중교통, 맛집, 편의시설% 지수가
                                            ‘상’이에요.
                                        </li>
                                        <li className='flex gap-2'>
                                            <Icon type='ic_bad' />
                                            %대중교통, 맛집, 편의시설% 지수가
                                            ‘상’이에요.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default MobileRegionFilterContent;
