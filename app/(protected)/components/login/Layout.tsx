"use client";

// * components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "../common/Icon";

const LoginLayout = ({ visible = false, setVisible }: any) => {
    return (
        <Dialog
            open={visible}
            onOpenChange={(e) => {
                setVisible(e);
            }}
        >
            <DialogContent className='max-w-[370px]'>
                <div className='w-full gap-5 flex flex-col items-center justify-center'>
                    <div className='flex flex-col gap-2  items-center'>
                        <Icon type='mainLogo' className='w-[100px] h-[50px]' />
                        <h1>동네 정보 공유 플랫폼</h1>
                    </div>

                    {/* 로그인/회원가입 */}
                    <div className='w-full'>
                        <div className='py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-700 before:me-6 after:flex-1 after:border-t after:border-gray-700 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600'>
                            로그인/회원가입
                        </div>
                    </div>
                    {/* sso buttons */}
                    <div className='grid gap-3  '>
                        <button className='flex  items-center justify-center w-[300px] h-[40px] bg-[#FEE102] rounded-md text-sm'>
                            <Icon type='ic_kakao' />
                            <p className='w-28 text-end'>카카오로 시작하기</p>
                        </button>
                        <button className='flex  items-center justify-center w-[300px] h-[40px] bg-[#57B04B] rounded-md text-sm'>
                            <Icon type='ic_naver' />
                            <p className='w-28 text-end'>네이버로 시작하기</p>
                        </button>
                        <button className='flex  items-center justify-center w-[300px] h-[40px] ring-1 ring-[#608DF9] rounded-md text-sm'>
                            <Icon type='ic_daum' />
                            <p className='w-28 text-end'> 다음으로 시작하기</p>
                        </button>
                        <button className='flex  items-center justify-center w-[300px] h-[40px] ring-1 ring-black rounded-md text-sm'>
                            <Icon type='ic_google' />
                            <p className='w-28 text-start pl-3'>
                                구글로 시작하기
                            </p>
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginLayout;
