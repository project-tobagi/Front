"use client";

// * install libraries
import { Button } from "@/components/ui/button";

const Step3 = ({ setStep }: any) => {
    return (
        <div>
            <div className='text-center'>
                <h1 className='text-lg font-semibold'>
                    동네 탐색을 완료했어요!
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    설정한 동네 조건과 알맞는 동네 탐색을 완료하였어요!
                    <br />
                    적절한 동네가 있는지 확인해보세요.
                </p>
            </div>
            <div className='flex justify-center'>
                <Button
                    onClick={() => {
                        setStep(1);
                    }}
                >
                    다시하기
                </Button>
            </div>
        </div>
    );
};

export default Step3;
