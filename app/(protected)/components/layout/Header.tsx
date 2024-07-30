"use client";

// * components
import Icon from "../Icon";
import { Input } from "@/components/ui/input";

const Header = () => {
    return (
        <div className='h-16 pt-4 px-4'>
            <div className='flex justify-between items-center'>
                {/* logo */}
                <div className='flex gap-2 h-full'>
                    <Icon type='mainLogo' isOriginal />
                    <Icon type='subLogo' isOriginal />
                </div>

                {/* input */}

                <div className=''>
                    <div className='relative'>
                        <Icon
                            className='absolute top-[50%] translate-y-[-50%] left-3'
                            type='ic_search'
                        />
                        <Input
                            className='w-96 rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12'
                            placeholder='여기를 클릭하여 궁금한 동네를 찾아보세요.'
                        />
                    </div>
                </div>

                {/* profile/notification */}
                <div className='flex gap-3'>
                    <div className='w-10 h-10 rounded-full ring-1 ring-gray-400'></div>
                    <div className='w-10 h-10 rounded-full ring-1 ring-gray-400'></div>
                </div>
            </div>
        </div>
    );
};

export default Header;
