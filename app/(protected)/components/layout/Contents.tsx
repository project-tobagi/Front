"use client";

// * install libraries
import { useAtomValue } from "jotai";
import _ from "lodash";

// * state
import { activeMenuState } from "../../_store/menu";

// * components
import AreaFilterLayout from "../area-filter/Layout";
import AreaMidPoingLayout from "../area-midpoint/Layout";
import MenuOverlay from "../common/MenuOverlay";

// * etc
import { MENU_TYPES } from "../../_utils/constants";

const Contents = ({ children }: any) => {
    const activeMenu = useAtomValue(activeMenuState);

    const menuComponents = [
        {
            type: "menu_1",
            component: <AreaFilterLayout />,
        },
        {
            type: "menu_2",
            component: <AreaMidPoingLayout />,
        },
        {
            type: "menu_3",
            component: <div>메뉴 3</div>,
        },
    ];

    return (
        <div className='relative'>
            {_.map(MENU_TYPES, (menu: any) => {
                const currentContents = _.find(menuComponents, {
                    type: activeMenu.type,
                });
                if (activeMenu.type == menu.type) {
                    return (
                        <MenuOverlay
                            key={menu.type}
                            contents={currentContents?.component}
                        />
                    );
                }
            })}

            {children}
        </div>
    );
};

export default Contents;
