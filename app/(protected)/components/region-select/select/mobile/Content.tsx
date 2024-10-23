"use client";

// * install libraries
import _ from "lodash";
import { useAtomValue } from "jotai";
import { Audio, ColorRing, Oval, Puff } from "react-loader-spinner";

// * state
import { regionDataState } from "@/app/(protected)/_store/region";

// * components
import Descriptions from "../../../region-midpoint/Descriptions";

interface RegionSelect {
    loading: any;
    setLoading: any;
    step: number;
    setStep: any;
    setOpen: any;
    selectedSido: {
        si: string;
        guList: any;
    };
    selectedSigugun: {
        gu: string;
        dongList: any;
    };
    selectedDong: {
        dong: string;
        code: string;
    };
    setSelectedSido: any;
    setSelectedSigugun: any;
    setSelectedDong: any;
}

const MobileRegionSelectContent = ({
    loading,
    setLoading,
    step,
    setStep,
    setOpen,
    selectedSido,
    selectedSigugun,
    selectedDong,
    setSelectedSido,
    setSelectedSigugun,
    setSelectedDong,
}: RegionSelect) => {
    const regionData = useAtomValue(regionDataState);

    if (loading) {
        return (
            <div className='h-[calc(100%-165px)] p-5 mt-16'>
                {/* loading 화면 */}

                <ColorRing
                    visible={true}
                    height='100'
                    width='100'
                    ariaLabel='color-ring-loading'
                    wrapperStyle={{}}
                    wrapperClass='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
                    colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                    ]}
                />
                <div className='h-full text-xl max-sm:text-base font-semibold'>
                    {selectedSido?.si +
                        " > " +
                        selectedSigugun?.gu +
                        " > " +
                        selectedDong?.dong}
                    에 대한 요약정보를 가져오고있어요
                </div>
            </div>
        );
    }

    if (step === 0) {
        return (
            <div className='h-[calc(100%-150px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 도/특별시/광역시는 어디인가요?'
                        subTitle=''
                    />
                    <ul className='h-[calc(100%-80px)] overflow-y-auto mx-3 my-1'>
                        {_.map(regionData, (data: any, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className='p-4 hover:bg-gray-100 max-lg:text-xs hover:text-[11px] rounded-xl cursor-pointer'
                                    onClick={() => {
                                        setStep(1);
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

    if (step === 1) {
        return (
            <div className='h-[calc(100%-150px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title='관심있는 시/군/구는 어디인가요?'
                        subTitle=''
                    />
                    <ul className='h-[calc(100%-80px)] overflow-y-auto mx-3 my-1'>
                        {_.map(
                            selectedSido.guList,
                            (data: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className='p-4 hover:bg-gray-100 max-lg:text-xs hover:text-[11px] rounded-xl cursor-pointer'
                                        onClick={() => {
                                            setStep(2);
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

    if (step === 2) {
        return (
            <div className='h-[calc(100%-150px)] mt-16'>
                <div className='h-full'>
                    <Descriptions
                        title=' 관심있는 동네는 어디인가요?'
                        subTitle=''
                    />
                    <ul className='h-[calc(100%-80px)] overflow-y-auto mx-3 my-1'>
                        {_.map(
                            selectedSigugun.dongList,
                            (data: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className='p-4 hover:bg-gray-100 max-lg:text-xs hover:text-[11px] rounded-xl cursor-pointer'
                                        onClick={() => {
                                            setLoading(true);
                                            setStep(0);
                                            setSelectedDong(data);
                                            // setOpen(false);
                                        }}
                                    >
                                        {data.dong}
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
};

export default MobileRegionSelectContent;
