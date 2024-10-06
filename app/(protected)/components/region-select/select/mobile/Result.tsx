"use client";

// * install libraries
import { useAtom, useAtomValue } from "jotai";

// * state
import { regionSummaryVisible } from "@/app/(protected)/_store/visible";
import { locationState } from "@/app/(protected)/_store/location";

// * components
import Icon from "../../../common/Icon";

const MobileRegionSummary = () => {
    const [summaryVisible, setSummaryVisible] = useAtom(regionSummaryVisible);
    const location = useAtomValue<any>(locationState);
    return (
        <div
            className={`
            fixed inset-x-0 bg-white z-[9999] rounded-t-3xl shadow-3xl
            transition-all duration-300 ease-in-out ring-1 ring-gray-200
            ${summaryVisible ? "top-20 bottom-0" : "top-[100%] bottom-[-100px]"}
        `}
            onClick={() => {
                setSummaryVisible(false);
            }}
        >
            {/* bar */}
            <div className='my-2 h-1 w-16 bg-gray-300 rounded-full m-auto'></div>

            {/* 내용 */}
            <div className='px-10 py-6'>
                {/* location */}
                {location.code !== null ? (
                    <div className='flex gap-2 items-center justify-center'>
                        <p className='inline text-white bg-black rounded-full py-0.5 px-2'>
                            {location.dong}
                        </p>
                        <h1 className='text-gray-400'>
                            {location.sido + " " + location.sigugun}
                        </h1>
                    </div>
                ) : (
                    <div>동네정보를 불러오지 못했습니다.</div>
                )}

                {/* contents */}
                <div className='mt-10 flex flex-col gap-4'>
                    <div className='flex flex-col justify-center text-center gap-2'>
                        <div className='flex gap-2 justify-center'>
                            <Icon type='ic_good' />
                            <h1>%대중교통, 맛집, 편의시설% 지수가 좋아요.</h1>
                        </div>
                        <div className='text-sm'>
                            <p>버스 정류장이 N개, 지하철역이 N개 있어요.</p>
                            <p>음식점이 N개, 카페가 N개 있어요.</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center text-center gap-2'>
                        <div className='flex gap-2 justify-center'>
                            <Icon type='ic_soso' />
                            <h1>
                                %대중교통, 맛집, 편의시설% 지수가 보통이에요.
                            </h1>
                        </div>
                        <div className='text-sm'>
                            <p>버스 정류장이 N개, 지하철역이 N개 있어요.</p>
                            <p>음식점이 N개, 카페가 N개 있어요.</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center text-center gap-2'>
                        <div className='flex gap-2 justify-center'>
                            <Icon type='ic_bad' />
                            <h1>%대중교통, 맛집, 편의시설% 지수가 나빠요.</h1>
                        </div>
                        <div className='text-sm'>
                            <p>버스 정류장이 N개, 지하철역이 N개 있어요.</p>
                            <p>음식점이 N개, 카페가 N개 있어요.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileRegionSummary;
