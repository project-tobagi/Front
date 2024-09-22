"use client";

// * components
import Icon from "../../../common/Icon";

const MobileRegionSelectHeader = ({ setOpen }: any) => {
    return (
        <div className='flex justify-center items-center py-4 border-b-[1px] border-gray-300 '>
            <button
                className='absolute left-4'
                onClick={() => {
                    setOpen(false);
                }}
            >
                <Icon type='ic_arrow' />
            </button>

            <h1 className='text-lg font-bold'>동네 요약</h1>
        </div>
    );
};

export default MobileRegionSelectHeader;
