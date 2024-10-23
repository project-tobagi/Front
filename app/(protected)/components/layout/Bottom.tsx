"use client";

// * basic
import { useState } from "react";

// * install libraries
import _ from "lodash";
import { useAtomValue, useAtom } from "jotai";

// * components
import Icon from "../common/Icon";
import { menuState } from "../../_store/menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Bottom = () => {
    const [menus, setMenus] = useAtom(menuState);
    return (
        <div className='fixed bottom-0.5 left-0.5 right-0.5 ring-1 ring-gray-200 shadow-xl z-[99999] w-full  bg-white h-[75px] lg:hidden py-4'>
            <div className='w-full flex items-center justify-around'>
                {_.map(menus, (item: any) => {
                    // 게시판 alert 보여주기
                    if (item.id === 3) {
                        return (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div
                                        key={`menu-${item.id}`}
                                        onClick={() => {
                                            if (!item.disable) {
                                                setMenus((menus: any) => {
                                                    return _.map(
                                                        menus,
                                                        (menu: any) => {
                                                            if (
                                                                menu.id ===
                                                                item.id
                                                            ) {
                                                                return {
                                                                    ...menu,
                                                                    active: true,
                                                                };
                                                            }
                                                            return {
                                                                ...menu,
                                                                active: false,
                                                            };
                                                        }
                                                    );
                                                });
                                            }
                                        }}
                                        className={[
                                            "flex flex-col gap-2 justify-center items-center cursor-pointer",
                                            !item.active && "opacity-30",
                                            item.disable &&
                                                "cursor-not-allowed",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        <Icon type={item.icon} />

                                        <h1 className='text-sm max-sm:text-xs'>
                                            {item.label}
                                        </h1>
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            현재 커뮤니티 페이지는 개발
                                            중입니다.
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            더 나은 서비스를 제공하기 위해
                                            열심히 준비하고 있으니, 곧 만나보실
                                            수 있습니다. 기대해 주세요!
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            확인
                                        </AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        );
                    }
                    return (
                        <div
                            key={`menu-${item.id}`}
                            onClick={() => {
                                if (!item.disable) {
                                    setMenus((menus: any) => {
                                        return _.map(menus, (menu: any) => {
                                            if (menu.id === item.id) {
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

                            <h1 className='text-sm max-sm:text-xs'>
                                {item.label}
                            </h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bottom;
