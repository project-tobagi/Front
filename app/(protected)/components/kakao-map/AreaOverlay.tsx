"use client";

// * basic
import { useState } from "react";

// * install libraries
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useAtomValue } from "jotai";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

// * state
import { locationState } from "../../_store/location";

const AreaOverlay = ({ coordinates, visible, setVisible }: any) => {
    const location = useAtomValue(locationState);

    if (coordinates !== null && location.sido !== null && visible) {
        return (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                // 커스텀 오버레이가 표시될 위치입니다
                position={coordinates}
            >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <div className='label bg-white w-[300px] h-[250px] rounded-2xl shadow-[0px_8px_16.8px_0px_#0000001A] p-3'>
                    <div className='flex justify-between'>
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
                </div>
            </CustomOverlayMap>
        );
    }
};

export default AreaOverlay;
