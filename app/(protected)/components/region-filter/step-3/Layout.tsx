"use client";

// * install libraries
import { Button } from "@/components/ui/button";

// * components
import RegionCard from "./RegioCard";

const Step3 = ({ stepFlow }: any) => {
    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center mt-3'>
                <h1 className='text-lg font-semibold'>
                    동네 탐색을 완료했어요!
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    설정한 동네 조건과 알맞는 동네 탐색을 완료하였어요!
                    <br />
                    적절한 동네가 있는지 확인해보세요.
                </p>
            </div>

            {/* contents */}
            <div>
                <RegionCard />
            </div>

            {/* buttons */}
            <div className='flex justify-center h-full items-end'>
                <Button
                    className='rounded-full px-6'
                    onClick={() => {
                        stepFlow.reset();
                    }}
                >
                    다시하기
                </Button>
            </div>
        </div>
    );
};

export default Step3;
