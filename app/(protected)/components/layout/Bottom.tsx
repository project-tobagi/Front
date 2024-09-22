"use client";

// * basic
import { useState } from "react";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../common/Icon";

const Bottom = () => {
    const bottomTypes = [
        {
            id: 1,
            label: "홈",
            icon: "ic_home",
            active: true,
        },
        {
            id: 2,
            label: "동네찾기",
            icon: "ic_menu",
            active: false,
        },
        {
            id: 3,
            label: "중간지점",
            icon: "ic_menu_2",
            active: false,
        },
        {
            id: 4,
            label: "게시판",
            icon: "ic_board",
            active: false,
        },
    ];

    const [bottomType, setBottomType] = useState(bottomTypes);
    return (
        <div className='absolute bottom-0.5 left-0.5 right-0.5 ring-2  ring-gray-300 shadow-md z-50 w-full  bg-white h-[100px] lg:hidden rounded-t-3xl p-5'>
            <div className='w-full flex items-center justify-around'>
                {_.map(bottomType, (bt: any) => {
                    return (
                        <div
                            onClick={() => {
                                setBottomType((prev: any) => {
                                    return _.map(prev, (item: any) => {
                                        if (bt.id === item.id) {
                                            return { ...item, active: true };
                                        } else {
                                            return { ...item, active: false };
                                        }
                                    });
                                });
                            }}
                            className={[
                                "flex flex-col gap-2 justify-center items-center cursor-pointer",
                                !bt.active && "opacity-30",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <Icon type={bt.icon} />

                            <h1 className='text-sm'>{bt.label}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bottom;
