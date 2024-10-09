"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../../common/Icon";
import { Slider } from "@/components/ui/slider";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const RegionFilterSliders = ({ conditions, setConditions }: any) => {
    const [open, setOpen] = useState([
        {
            type: "mart",
            visible: false,
        },
        { type: "security", visible: false },
        {
            type: "culture",
            visible: false,
        },
        {
            type: "restaurant",
            visible: false,
        },
        {
            type: "station",
            visible: false,
        },
        {
            type: "infra",
            visible: false,
        },
    ]);

    return (
        <div className='grid max-lg:gap-3 lg:gap-2'>
            {_.map(conditions, (condition: any) => {
                return (
                    <div
                        key={condition.id}
                        className='flex gap-5 whitespace-nowrap items-center '
                    >
                        <div className='flex gap-2 items-center'>
                            <input
                                checked={condition.active}
                                onChange={() => {}}
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

                        <button
                            onClick={() => {
                                setOpen((prev) => {
                                    return _.map(prev, (item) => {
                                        if (condition.type === item.type) {
                                            return { ...item, visible: true };
                                        } else {
                                            return { ...item, visible: false };
                                        }
                                    });
                                });
                            }}
                        >
                            <Icon
                                type='ic_info'
                                className='size-6 max-lg:size-8'
                            />
                        </button>
                        {/* 카테고리 설명 dialog */}
                        <Dialog
                            open={
                                _.find(open, { type: condition.type })?.visible
                            }
                        >
                            <DialogContent className='[&>button]:hidden rounded-lg '>
                                <DialogHeader>
                                    <DialogDescription>
                                        <div className='px-4 grid gap-6'>
                                            <div className='flex justify-center'>
                                                <Icon
                                                    isOriginal
                                                    type='ic_info_active'
                                                />
                                            </div>
                                            <p className='text-lg text-black text-center'>
                                                - {condition.label}에 대한 설명
                                                - 각 동네별 버스정류장 및
                                                지하철역의 개수를 기준으로
                                                상/중/하를 판단합니다.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setOpen((prev) => {
                                                        return _.map(
                                                            prev,
                                                            (item) => {
                                                                return {
                                                                    ...item,
                                                                    visible:
                                                                        false,
                                                                };
                                                            }
                                                        );
                                                    });
                                                }}
                                                className='w-full h-12 bg-[#00A2FF] text-white rounded-lg '
                                            >
                                                확인
                                            </button>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                );
            })}
        </div>
    );
};

export default RegionFilterSliders;
