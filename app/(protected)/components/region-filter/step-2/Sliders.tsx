"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../../common/Icon";
import { Slider } from "@/components/ui/slider";

const RegionFilterSliders = ({ conditions, setConditions }: any) => {
    return (
        <div className='grid max-lg:gap-8 lg:gap-2'>
            {_.map(conditions, (condition: any) => {
                return (
                    <div
                        key={condition.id}
                        className='flex gap-5 whitespace-nowrap items-center '
                    >
                        <div className='flex gap-2 items-center'>
                            <input
                                checked={condition.active}
                                onClick={(e) => {
                                    setConditions((prev: any) => {
                                        return _.map(prev, (item: any) => {
                                            if (condition.id === item.id) {
                                                return {
                                                    ...item,
                                                    active: !item.active,
                                                };
                                            }

                                            return item;
                                        });
                                    });
                                }}
                                type='radio'
                                className='w-5 h-5'
                            />
                            <h1 className='w-[80px]'>{condition.label}</h1>
                        </div>
                        <div className='w-full'>
                            {condition.active ? (
                                <Slider
                                    onValueChange={(v: any) => {
                                        setConditions((prev: any) => {
                                            return _.map(prev, (item: any) => {
                                                if (condition.id === item.id) {
                                                    return {
                                                        ...item,
                                                        value:
                                                            v[0] === 0
                                                                ? 1
                                                                : v[0] === 50
                                                                ? 2
                                                                : 3,
                                                    };
                                                }

                                                return item;
                                            });
                                        });
                                    }}
                                    defaultValue={[50]}
                                    max={100}
                                    step={50}
                                    className='mt-4'
                                />
                            ) : (
                                <div className='h-1 rounded-full bg-secondary mt-4'></div>
                            )}

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
