"use client";

"use client";

// * basic
import { useState } from "react";

// * install libraries
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { useAtomValue } from "jotai";

// state
import { midPointState } from "../../_store/location";

const MidPointOverlay = ({ coordinates, visible, setVisible }: any) => {
    const midPoint = useAtomValue<any>(midPointState);

    if (coordinates !== null && visible) {
        return (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                // 커스텀 오버레이가 표시될 위치입니다
                position={coordinates}
            >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <div
                    id='speechBubble'
                    className='relative label bg-white w-[300px] h-[250px] rounded-2xl shadow-[0px_8px_16.8px_0px_#0000001A] p-3'
                >
                    <div className='relative flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <Badge>{midPoint.category_group_name}</Badge>
                            <p className='text-xs text-[#858585]'>
                                {midPoint.place_name}
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

                    <div>
                        <div className='mt-3'>
                            <p className='text-xs text-gray-400'>
                                주소 : {midPoint.address_name}
                            </p>
                            <p className='text-xs text-gray-400'>
                                도로명 주소 : {midPoint.road_address_name}
                            </p>
                        </div>
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

export default MidPointOverlay;
