"use client";

// * install libaries
import _ from "lodash";
import { useAtom } from "jotai";

// * state
import { menuState } from "../../_store/menu";

// * components
import Icon from "../common/Icon";

const Left = () => {
    const [menus, setMenus]: any = useAtom<any>(menuState);

    return (
        <div className='h-full w-16 border-[1px] border-[#eaeaea] rounded-lg flex justify-center pt-4 mr-4 max-lg:hidden'>
            <div className='flex flex-col gap-4'>
                {_.map(menus, (item: any) => {
                    if (0 < item.id && item.id < 3) {
                        return (
                            <button
                                onClick={() => {
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
                                }}
                                key={`item-${item.id}`}
                                className={[
                                    "ring-1 ring-[#eaeaea] rounded-full p-2 ",
                                    item.active
                                        ? "bg-black"
                                        : "bg-white hover:bg-[#E3E3E3]",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <Icon
                                    className='w-6 h-6'
                                    type={
                                        item.active
                                            ? item.activeIcon
                                            : item.icon
                                    }
                                />
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Left;
