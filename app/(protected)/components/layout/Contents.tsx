"use client";

// * install libraries
import { useAtomValue } from "jotai";
import _ from "lodash";

// * state
import { menuState } from "../../_store/menu";

// * components
import RegionFilterLayout from "../region-filter/Layout";
import RegionMidPoingLayout from "../region-midpoint/Layout";
import MenuOverlay from "../common/MenuOverlay";

const Contents = ({ children }: any) => {
    const menus = useAtomValue(menuState);

    const menuComponents = [
        {
            id: 1,
            component: <RegionFilterLayout />,
        },
        {
            id: 2,
            component: <RegionMidPoingLayout />,
        },
        {
            id: 3,
            component: <div>메뉴 3</div>,
        },
    ];

    return (
        <div className='lg:relative'>
            {_.map(menus, (menu: any) => {
                const currentContents = _.find(menuComponents, {
                    id: menu.id,
                });
                if (menu.active && currentContents?.component !== undefined) {
                    return (
                        <MenuOverlay
                            key={menu.id}
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
