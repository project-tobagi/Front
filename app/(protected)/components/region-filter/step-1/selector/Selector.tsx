"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

// * components
import { Button } from "@/components/ui/button";
import DesktopRegionSelect from "../../../region-select/select/desktop/Layout";

// * etc
import { locationState } from "@/app/(protected)/_store/location";
import { polygonState } from "@/app/(protected)/_store/region";
import {
    API_RESION_POLYGON,
    API_SUMMARY_RANK_INFO,
} from "@/app/(protected)/_api";
import { generateRegionRank } from "@/app/(protected)/_utils/rank";
import { summaryDataState } from "@/app/(protected)/_store/summary";
import { useUpdateEffect } from "react-use";
import { menuState } from "@/app/(protected)/_store/menu";

const RegionSelectorLayout = ({
    open,
    setOpen,
    selectorRef,
    setSearchContents,
    selectedSido,
    setSelectedSido,
    selectedSigugun,
    setSelectedSigugun,
}: {
    open: boolean;
    setOpen: any;
    selectorRef: any;
    setSearchContents: any;
    selectedSido: any;
    setSelectedSido: any;
    selectedSigugun: any;
    setSelectedSigugun: any;
}) => {
    const depth = 2;
    const [location, setLocation] = useAtom(locationState);

    const [polygon, setPolygon]: any = useAtom(polygonState);
    const [, setSummaryData] = useAtom(summaryDataState);
    const menus = useAtomValue(menuState);

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });

    const [loading, setLoading] = useState(false);

    const initRegion = () => {
        setSelectedSido(null);
        setSelectedSigugun(null);
    };

    const handleClickSaveSelectedRegion = () => {
        const { si } = selectedSido || {};
        const { gu } = selectedSigugun || {};

        const searchContents = [si, ">", gu];
        setSearchContents(searchContents);
    };

    useEffect(() => {
        if (!open) {
            // initRegion();
            setLoading(false);
        }
    }, [open]);

    useEffect(() => {
        if (location.code !== null) {
            API_RESION_POLYGON(location.code)
                .then((res: any) => {
                    setPolygon((prev: any) => {
                        return _.map(res.data[0][0], (item) => {
                            return { lng: item[0], lat: item[1] };
                        });
                    });
                })
                .catch((err) => {
                    toast.error("선택한 동네의 영역을 찾지 못했습니다.", {
                        position: "top-right",
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        setOpen(false);
                        setLoading(false);
                    }, 1500);
                });
        }
    }, [location]);

    useEffect(() => {
        if (location.code !== null && polygon !== null) {
            API_SUMMARY_RANK_INFO({
                donCd: _.join(_.slice(location.code, 0, 8), ""),
            })
                .then((res) => {
                    setSummaryData(generateRegionRank(res.data, true));
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("선택한 동네의 정보를 찾지 못했습니다.", {
                        position: "top-right",
                    });
                });
        }
    }, [polygon]);

    useUpdateEffect(() => {
        setSearchContents(null);
    }, [menus]);

    if (open && isDesktopOrLaptop) {
        return (
            <div
                ref={selectorRef}
                className='w-full h-48 absolute z-50 mt-1.5 shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 rounded-xl'
            >
                <div className='bg-white size-full flex flex-col justify-between rounded-xl'>
                    {/* 동네 선택 폼 */}
                    <DesktopRegionSelect
                        depth={depth}
                        selectedSido={selectedSido}
                        selectedSigugun={selectedSigugun}
                        setSelectedSido={setSelectedSido}
                        setSelectedSigugun={setSelectedSigugun}
                    />

                    <div className='flex justify-center gap-1.5 py-1.5 border-t-[1px] border-gray-300'>
                        <Button
                            className={[
                                "bg-[#EAEAEA] text-black opacity-100 pointer-events-none h-7",
                                depth === 2 &&
                                    selectedSigugun &&
                                    selectedSigugun.gu !== null &&
                                    "bg-[#00A2FF] hover:bg-sky-400 text-white pointer-events-auto",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={() => {
                                // initRegion();
                                setOpen(false);
                                handleClickSaveSelectedRegion();
                            }}
                        >
                            완료
                        </Button>
                        <Button
                            onClick={() => {
                                setSearchContents(null);
                                setSelectedSido(null);
                                setSelectedSigugun(null);
                            }}
                            className='h-7 bg-[#EAEAEA] hover:bg-[#eeeeee] hover:opacity-80 text-black '
                        >
                            초기화
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default RegionSelectorLayout;
