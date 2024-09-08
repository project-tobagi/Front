"use client";

"use client";

// * basic
import { useState } from "react";

// * install libraries
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { toast } from "react-toastify";
import _ from "lodash";

// *  state
import { midPointPlaceState, midPointState } from "../../_store/location";

// * components
import Icon from "../common/Icon";

// * etc
import { saveClipboardText } from "@/app/(protected)/_utils/clipboard";

const MidPointOverlay = ({ coordinates, visible, setVisible }: any) => {
    const midPoint = useAtomValue<any>(midPointPlaceState);

    const generateNaverMapLink = (address: string) => {
        return `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
    };

    const generateKakaoMapLink = (address: string) => {
        return `https://map.kakao.com/link/search/${encodeURIComponent(
            address
        )}`;
    };

    if (coordinates !== null && visible) {
        return (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                // 커스텀 오버레이가 표시될 위치입니다
                position={{
                    lat: Number(coordinates.lat) + 0.00043,
                    lng: Number(coordinates.lng),
                }}
            >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}

                <div
                    className={[
                        "shadow-lg rounded-lg mt-1 mx-2 mb-3 px-3 py-2 cursor-pointer bg-white min-w-72",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <div className='flex justify-between '>
                        <div className='flex items-center gap-2'>
                            <h1 title={midPoint.place_name}>
                                {_.truncate(midPoint.place_name, {
                                    length: 12,
                                })}
                            </h1>
                            <p className='h-4 rounded-full text-xs text-gray-500 px-1 flex items-center ring-1 ring-gray-300'>
                                {midPoint.category_group_name}
                            </p>
                        </div>
                        <div className='flex gap-2 '>
                            <a
                                href={generateNaverMapLink(midPoint.place_name)}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <button>
                                    <Icon type='ic_naver_map' />
                                </button>
                            </a>
                            <a
                                href={generateKakaoMapLink(midPoint.place_name)}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <button>
                                    <Icon type='ic_kakao_map' />
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 mt-1 text-xs'>
                        <li className='flex items-center gap-2'>
                            <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs'>
                                도로명
                            </h1>
                            <p>{midPoint?.address_name}</p>
                            <button
                                onClick={() => {
                                    saveClipboardText(
                                        midPoint?.address_name,
                                        "도로명",
                                        toast
                                    );
                                }}
                            >
                                <Icon type='ic_copy_paste' />
                            </button>
                        </li>
                        <li className='flex items-center gap-2'>
                            <h1 className='px-1 h-4 flex items-center ring-1  ring-black rounded-md text-xs'>
                                지번
                            </h1>
                            <p>{midPoint?.road_address_name || "알 수 없음"}</p>
                            <button
                                onClick={() => {
                                    saveClipboardText(
                                        midPoint?.address_name,
                                        "지번",
                                        toast
                                    );
                                }}
                            >
                                <Icon type='ic_copy_paste' />
                            </button>
                        </li>
                    </div>

                    {/* 말풍선 꼬리 */}
                    <div className='absolute left-[50%] translate-x-[-50%] bottom-[4px]'>
                        <div className='relative w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white'></div>
                    </div>
                </div>
            </CustomOverlayMap>
        );
    }
};

export default MidPointOverlay;
