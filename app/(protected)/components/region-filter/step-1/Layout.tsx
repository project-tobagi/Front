"use client";

// * install libaries
import { Button } from "@/components/ui/button";

const Step1 = ({ setStep }: any) => {
    return (
        <div>
            <div className='text-center'>
                <h1 className='text-lg font-semibold'>
                    관심있는 지역이 있나요?
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    관심 지역을 자세하게 선택할수록 <br />
                    원하는 동네를 찾을 확률이 높아요.
                </p>
            </div>
            <div className='flex justify-end'>
                <Button
                    className='rounded-full'
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
