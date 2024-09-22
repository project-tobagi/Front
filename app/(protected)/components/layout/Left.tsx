"use client";

// * install libaries
import _ from "lodash";
import { useAtom } from "jotai";

// * state
import { activeMenuState } from "../../_store/menu";

// * components
import Icon from "../common/Icon";

// * etc
import { MENU_TYPES } from "../../_utils/constants";

const Left = () => {
    const [activeMenu, setActiveMenu]: any = useAtom<any>(activeMenuState);

    return (
        <div className='h-full w-16 border-[1px] border-[#eaeaea] rounded-lg flex justify-center pt-4 mr-4 max-lg:hidden'>
            <div className='flex flex-col gap-4'>
                {_.map(MENU_TYPES, (item: any) => {
                    return (
                        <button
                            onClick={() => {
                                setActiveMenu((prev: any) => {
                                    if (prev.type === item.type) {
                                        return {
                                            type: "",
                                            icon: "",
                                            activeIcon: "",
                                        };
                                    } else {
                                        return item;
                                    }
                                });
                            }}
                            key={`item-${item.type}`}
                            className={[
                                "ring-1 ring-[#eaeaea] rounded-full p-2 ",
                                activeMenu.type === item.type
                                    ? "bg-black"
                                    : "bg-white hover:bg-[#E3E3E3]",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <Icon
                                className='w-6 h-6'
                                type={
                                    activeMenu.type === item.type
                                        ? item.activeIcon
                                        : item.icon
                                }
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Left;
