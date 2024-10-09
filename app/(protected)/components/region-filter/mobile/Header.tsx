"use client";

// * install libraries
import _ from "lodash";

// * state
import { menuState } from "@/app/(protected)/_store/menu";

// * components
import Icon from "../../common/Icon";
import { useResetAtom } from "jotai/utils";

const MobileRegionFilterHeader = ({ stepFlow }: any) => {
    const resetMenus = useResetAtom(menuState);
    return (
        <div className='fixed w-full flex justify-center items-center py-4 border-b-[1px] border-gray-300 bg-white '>
            <button
                className='absolute left-4'
                onClick={() => {
                    if (stepFlow.step === 0) {
                        resetMenus();
                    } else {
                        stepFlow.back();
                    }
                }}
            >
                <Icon type='ic_arrow' />
            </button>

            <h1 className='text-lg max-sm:text-base font-bold'>동네 찾기</h1>
        </div>
    );
};

export default MobileRegionFilterHeader;
