"use client";

// * basic
import { useState } from "react";

// * install libraries
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useAtomValue } from "jotai";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import _ from "lodash";

// * state
import { locationState } from "../../_store/location";
import { summaryDataState } from "../../_store/summary";

// * components
import Icon from "../common/Icon";

const RegionOverlay = ({ coordinates, visible, setVisible }: any) => {
    const location = useAtomValue(locationState);
    const summaryData = useAtomValue(summaryDataState);

    if (coordinates !== null && location.sido !== null && visible) {
        return (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                // 커스텀 오버레이가 표시될 위치입니다
                position={{
                    lat: Number(coordinates.lat) + 0.0268,
                    lng: Number(coordinates.lng) + 0.00075,
                }}
            >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <div
                    id='speechBubble'
                    className='relative label bg-white w-[300px] h-[250px] rounded-2xl shadow-[0px_8px_16.8px_0px_#0000001A] p-3 '
                >
                    <div className='relative flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <Badge>{location.dong}</Badge>
                            <p className='text-xs text-[#858585]'>
                                {location.sido + location.sigugun}
                            </p>
                        </div>

                        <button
                            className='flex flex-start'
                            onClick={() => {
                                setVisible(false);
                            }}
                        >
                            <XIcon size={18} />
                        </button>
                    </div>

                    {/* contents */}
                    <div className='mt-10 lg:mt-5 flex flex-col gap-8 lg:gap-2 max-w-lg m-auto '>
                        {_.map(summaryData, (data, index: number) => {
                            return (
                                <div
                                    key={`data-${data.rank}`}
                                    className='flex flex-col justify-center text-center gap-2'
                                >
                                    <div className='flex overflow-x-auto gap-3 lg:gap-2 justify-start items-center font-bold text-lg lg:text-xs '>
                                        <Icon
                                            className='w-8 h-8 lg:w-5 lg:h-5'
                                            type={
                                                data.rank === 1
                                                    ? "ic_good"
                                                    : data.rank === 2
                                                    ? "ic_soso"
                                                    : "ic_bad"
                                            }
                                        />
                                        <h1 className='whitespace-normal text-start'>
                                            {_.join(data.category, ", ") + " "}
                                            지수가
                                            {data.rank === 1
                                                ? " 좋아요."
                                                : data.rank === 2
                                                ? " 보통이에요."
                                                : " 나빠요."}
                                        </h1>
                                    </div>
                                    <div className='text-sm lg:text-xs flex gap-1 justify-start ml-11 lg:ml-7 '>
                                        {_.map(
                                            data.category,
                                            (num, index: number) => {
                                                return (
                                                    <p className='' key={index}>
                                                        {data.storeTypeNm[
                                                            index
                                                        ] + data.count[index]}
                                                        개
                                                        {Number(
                                                            data.category.length
                                                        ) -
                                                            1 !==
                                                        index
                                                            ? ","
                                                            : ""}
                                                    </p>
                                                );
                                            }
                                        )}
                                        있어요
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 말풍선 꼬리 */}
                    <div className='absolute left-[50%] translate-x-[-50%] bottom-[-2px] '>
                        <div className='rounded-2xl relative before:absolute before:-bottom-2.5 before:-left-5 before:h-8 before:w-8 before:-rotate-45 before:transform before:border-l-3 before:border-t-3 before:border-white before:bg-white before:rounded-[10px] before:z-[-1]'></div>
                    </div>
                </div>
            </CustomOverlayMap>
        );
    }
};

export default RegionOverlay;
