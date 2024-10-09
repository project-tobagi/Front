"use client";

// * install libraries
import { useAtom, useAtomValue } from "jotai";

// * state
import { regionSummaryVisible } from "@/app/(protected)/_store/visible";
import { locationState } from "@/app/(protected)/_store/location";
import { summaryDataState } from "../../_store/summary";

// * components
import Icon from "./Icon";
import _ from "lodash";

const SummaryOverlay = () => {
    const [summaryVisible, setSummaryVisible] = useAtom(regionSummaryVisible);
    const location = useAtomValue<any>(locationState);
    const summaryData = useAtomValue(summaryDataState);

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
                <div className='mt-10 flex flex-col gap-8 max-w-lg m-auto'>
                    {_.map(summaryData, (data, index: number) => {
                        return (
                            <div
                                key={`data-${data.rank}`}
                                className='flex flex-col justify-center text-center gap-2'
                            >
                                <div className='flex gap-3 justify-start items-center font-bold text-lg'>
                                    <Icon
                                        className='w-8 h-8'
                                        type={
                                            data.rank === 1
                                                ? "ic_good"
                                                : data.rank === 2
                                                ? "ic_soso"
                                                : "ic_bad"
                                        }
                                    />
                                    <h1>
                                        {_.join(data.category, ", ") + " "}
                                        지수가
                                        {data.rank === 1
                                            ? " 좋아요."
                                            : data.rank === 2
                                            ? " 보통이에요."
                                            : " 나빠요."}
                                    </h1>
                                </div>
                                <div className='text-sm flex gap-1 justify-start ml-11'>
                                    {_.map(
                                        data.category,
                                        (num, index: number) => {
                                            return (
                                                <p key={index}>
                                                    {data.storeTypeNm[index] +
                                                        data.count[index]}
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
            </div>
        </div>
    );
};

export default SummaryOverlay;
