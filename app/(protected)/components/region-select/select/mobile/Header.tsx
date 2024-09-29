"use client";

// * components
import Icon from "../../../common/Icon";

const MobileRegionSelectHeader = ({ setOpen }: any) => {
    return (
        <div className='fixed w-full flex justify-center items-center py-4 border-b-[1px] border-gray-300 bg-white'>
            <button
                className='absolute left-4'
                onClick={() => {
                    setOpen(false);
                }}
            >
                <Icon type='ic_arrow' />
            </button>

            <h1 className='text-lg max-sm:text-base font-bold'>동네 요약</h1>
        </div>
    );
};

export default MobileRegionSelectHeader;
