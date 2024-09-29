"use client";

// * basic
import { useState } from "react";

// * install libraries
import _ from "lodash";
import { useAtomValue, useAtom } from "jotai";

// * components
import Icon from "../common/Icon";
import { menuState } from "../../_store/menu";

const Bottom = () => {
    const [menus, setMenus] = useAtom(menuState);
    return (
        <div className='absolute bottom-0.5 left-0.5 right-0.5 ring-2  ring-gray-300 shadow-md z-[999999] w-full  bg-white h-[100px] lg:hidden rounded-t-3xl p-5'>
            <div className='w-full flex items-center justify-around'>
                {_.map(menus, (item: any) => {
                    return (
                        <div
                            onClick={() => {
                                if (!item.disable) {
                                    setMenus((menus: any) => {
                                        return _.map(menus, (menu: any) => {
                                            if (
                                                menu.id === item.id &&
                                                !item.active
                                            ) {
                                                return {
                                                    ...menu,
                                                    active: true,
                                                };
                                            }
                                            return { ...menu, active: false };
                                        });
                                    });
                                }
                            }}
                            className={[
                                "flex flex-col gap-2 justify-center items-center cursor-pointer",
                                !item.active && "opacity-30",
                                item.disable && "cursor-not-allowed",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <Icon type={item.icon} />

                            <h1 className='text-sm'>{item.label}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bottom;
