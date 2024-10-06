"use client";

// * install libraries
import { useAtom, useAtomValue } from "jotai";
import _ from "lodash";

// * state
import { menuState } from "../../_store/menu";
import { regionSummaryVisible } from "../../_store/visible";

// * components
import RegionFilterLayout from "../region-filter/Layout";
import RegionMidPoingLayout from "../region-midpoint/Layout";
import MenuOverlay from "../common/MenuOverlay";
import MobileRegionSummary from "../region-select/select/mobile/Result";
import { useEffect, useState } from "react";
import { polygonState } from "../../_store/region";

const Contents = ({ children }: any) => {
    const [summaryVisible, setSummaryVisible] = useAtom(regionSummaryVisible);
    const menus = useAtomValue(menuState);
    const polygon = useAtomValue(polygonState);

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

    useEffect(() => {
        if (polygon !== null) {
            setTimeout(() => {
                setSummaryVisible(true);
            }, 2000);
        }
    }, [polygon]);

    return (
        <div className='relative'>
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

            {/* overlay */}
            <MobileRegionSummary />
        </div>
    );
};

export default Contents;
