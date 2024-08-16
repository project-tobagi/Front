"use client";

// * install libaries
import { Button } from "@/components/ui/button";

const Step2 = ({ setStep }: any) => {
    return (
        <div className='w-full'>
            <div className='text-center'>
                <h1 className='text-lg font-semibold'>
                    관심있는 동네의 조건이 있나요?
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    중요하게 생각하는 동네의 조건을 설정해보세요. <br />
                    중요도를 자세하게 설정할수록 원하는 동네를 찾을 확률이
                    높아져요!
                </p>
            </div>
            <div className='w-full flex justify-between'>
                <Button
                    onClick={() => {
                        setStep((prev: number) => {
                            return (prev -= 1);
                        });
                    }}
                >
                    뒤로
                </Button>
                <Button
                    onClick={() => {
                        setStep((prev: number) => {
                            return (prev += 1);
                        });
                    }}
                >
                    탐색
                </Button>
            </div>
        </div>
    );
};

export default Step2;
