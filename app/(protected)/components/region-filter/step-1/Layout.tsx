"use client";

// * install libaries
import { Button } from "@/components/ui/button";

// * components
import RegionFilterSelector from "./Selector";

const Step1 = ({ setStep }: any) => {
    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center mt-3'>
                <h1 className='text-lg font-semibold'>
                    관심있는 지역이 있나요?
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    관심 지역을 자세하게 선택할수록 <br />
                    원하는 동네를 찾을 확률이 높아요.
                </p>
            </div>

            {/* contents */}
            <div>
                <RegionFilterSelector />
            </div>

            {/* buttons */}
            <div className='flex justify-end h-full items-end'>
                <Button
                    className='rounded-full px-6'
                    onClick={() => {
                        setStep((prev: number) => {
                            return (prev += 1);
                        });
                    }}
                >
                    다음
                </Button>
            </div>
        </div>
    );
};

export default Step1;
