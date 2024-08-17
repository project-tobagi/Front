"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../../common/Icon";
import { Slider } from "@/components/ui/slider";

const RegionFilterSliders = ({ conditions, setConditions }: any) => {
    return (
        <div className='grid gap-2'>
            {_.map(conditions, (condition: any) => {
                return (
                    <div className='flex gap-5 whitespace-nowrap items-center '>
                        <div className='flex gap-2 items-center'>
                            <input type='radio' className='w-5 h-5' />
                            <h1 className='w-[80px]'>{condition.label}</h1>
                        </div>
                        <div className='w-full'>
                            <Slider
                                defaultValue={[50, 0]}
                                max={100}
                                step={50}
                                className='mt-4'
                            />
                            <ul className='flex justify-between mt-1.5 text-[10px] text-gray-500'>
                                <li>낮음</li>
                                <li>보통</li>
                                <li>높음</li>
                            </ul>
                        </div>

                        <button>
                            <Icon type='ic_info' className='w-6 h-6' />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default RegionFilterSliders;
