"use client";

// * components
import { Badge } from "@/components/ui/badge";

const RegionCard = () => {
    return (
        <div className='h-[90px] ring-1 ring-gray-300 hover:ring-blue-400 rounded-lg py-2 px-2'>
            <div className='relative flex gap-2 flex-col justify-between'>
                {/* header */}
                <div className='flex items-center gap-1'>
                    <Badge>예관동</Badge>
                    <p className='text-xs text-[#858585]'>서울특별시 중구</p>
                </div>

                {/* contents */}
                <div>
                    <h1 className='text-xs '>
                        치안, 편의시설 조건이 주변 지역보다 좋은 동네
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default RegionCard;
