"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import { useAtom, useAtomValue } from "jotai";
import _ from "lodash";
import { useResetAtom } from "jotai/utils";

// * state
import { menuState } from "../../_store/menu";
import { regionSummaryVisible } from "../../_store/visible";
import { filteredRegionListState, polygonState } from "../../_store/region";
import {
    addressState,
    locationState,
    midPointPlaceState,
    midPointState,
    relatedSearchListState,
} from "../../_store/location";
import { summaryDataState } from "../../_store/summary";

// * components
import RegionFilterLayout from "../region-filter/Layout";
import RegionMidPoingLayout from "../region-midpoint/Layout";
import MenuOverlay from "../common/MenuOverlay";
import SummaryOverlay from "../common/SummaryOverlay";

const Contents = ({ children }: any) => {
    const [summaryVisible, setSummaryVisible] = useAtom(regionSummaryVisible);
    const menus = useAtomValue(menuState);
    const [polygon, setPolygon] = useAtom(polygonState);

    // reset state
    const resetLocation = useResetAtom(locationState);
    const resetSummaryData = useResetAtom(summaryDataState);
    const resetMidPoint = useResetAtom(midPointState);
    const resetMidPointPlace = useResetAtom(midPointPlaceState);
    const resetAddress = useResetAtom(addressState);
    const resetRelatedSearchList = useResetAtom(relatedSearchListState);
    const resetFilteredRegionList = useResetAtom(filteredRegionListState);

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
            }, 1500);
        }
    }, [polygon]);

    // 메뉴 이동시 전체 데이터 reset
    useEffect(() => {
        resetLocation();
        resetSummaryData();
        resetMidPoint();
        resetMidPointPlace();
        resetAddress();
        resetRelatedSearchList();
        resetFilteredRegionList();
        setSummaryVisible(false);
        setPolygon(null);
    }, [menus]);

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
            <SummaryOverlay />
        </div>
    );
};

export default Contents;
