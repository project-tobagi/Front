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
            <div className='h-[calc(100%-165px)]'>
                <div className='h-full'>
                    <h1 className='font-semibold text-xl p-5'>
                        관심있는 지역은 어디인가요?
                    </h1>
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
            <div className='h-[calc(100%-165px)]'>
                <div className='h-full'>
                    <div className='p-5'>
                        <h1 className='font-semibold text-xl'>
                            관심있는 시/군/구는 어디인가요?
                        </h1>
                        <p className='text-base text-gray-400 mt-2'>
                            자세하게 선택할수록 원하는 동네를 찾을 확률이
                            높아져요!
                        </p>
                    </div>

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
            <div>
                <h1 className='font-semibold text-xl p-5'>
                    중요하게 생각하는 동네의 조건을 설정해주세요.
                </h1>
                <div className='p-8'>
                    <RegionFilterSliders
                        conditions={conditions}
                        setConditions={setConditions}
                    />
                </div>

                <div className='px-4 '>
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
            <div>
                <div className='p-5'>
                    <div className='mb-4'>
                        <h1 className='font-semibold text-xl'>
                            동네 탐색을 완료했어요!
                        </h1>
                        <p className='text-base text-gray-400 mt-2'>
                            설정한 조건에 일치하는 동네 탐색을 완료했어요.
                            동네별 요약 정보를 확인해보세요!
                        </p>
                    </div>

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
                                    <ul className='flex flex-col gap-2'>
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
