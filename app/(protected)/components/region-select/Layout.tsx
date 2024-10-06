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
import RegionSelect from "./Select";
import DesktopRegionSelect from "./select/desktop/Layout";
import MobileRegionSelect from "./select/mobile/Layout";

// * etc
import { locationState } from "../../_store/location";
import { polygonState } from "../../_store/region";
import { API_RESION_POLYGON } from "../../_api";

const RegionSelectorLayout = ({
    depth = 3,
    open,
    setOpen,
    selectorRef,
    setSearchContents,
}: {
    depth?: number;
    open: boolean;
    setOpen: any;
    selectorRef: any;
    setSearchContents: any;
}) => {
    const [location, setLocation] = useAtom(locationState);
    const [selectedSido, setSelectedSido] = useState<any>(null);
    const [selectedSigugun, setSelectedSigugun] = useState<any>(null);
    const [selectedDong, setSelectedDong] = useState<any>(null);
    const [polygon, setPolygon]: any = useAtom(polygonState);

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
    const isMobile = useMediaQuery({ maxWidth: 1224 });

    const [loading, setLoading] = useState(false);

    const initRegion = () => {
        setSelectedSido(null);
        setSelectedSigugun(null);
        setSelectedDong(null);
    };

    // 선택한 동네 저장
    const handleClickSaveSelectedRegion = () => {
        const { si } = selectedSido || {};
        const { gu } = selectedSigugun || {};
        const { dong, code } = selectedDong || {};

        const searchContents = [si, ">", gu];
        if (dong) searchContents.push(">", dong);
        setSearchContents(searchContents);

        if (depth === 3) {
            setLocation({
                sido: si,
                sigugun: gu,
                dong: dong,
                code: code,
            });
        }
    };

    useEffect(() => {
        if (!open) {
            initRegion();
            setLoading(false);
        }
    }, [open]);

    useEffect(() => {
        if (isMobile && selectedDong !== null) {
            handleClickSaveSelectedRegion();
        }
    }, [selectedDong]);

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

    // useEffect(() => {
    //     if (polygon !== null) {
    //         setOpen(false);
    //         setLoading(false);
    //     }
    // }, [polygon]);

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
                        selectedDong={selectedDong}
                        setSelectedSido={setSelectedSido}
                        setSelectedSigugun={setSelectedSigugun}
                        setSelectedDong={setSelectedDong}
                    />

                    <div className='flex justify-center gap-1.5 py-1.5 border-t-[1px] border-gray-300'>
                        <Button
                            className={[
                                "bg-[#EAEAEA] text-black opacity-100 pointer-events-none h-7",

                                // // 선택한 시군구가 있으면서 그에 해당하는 동이 없을때
                                // selectedSigugun &&
                                //     selectedSigugun.sigugun !== null &&
                                //     _.findIndex(region.dong, {
                                //         sigugun: selectedSigugun.sigugun,
                                //     }) === -1 &&
                                //     "bg-[#00A2FF] hover:bg-sky-400 text-white pointer-events-auto",
                                // 동까지 모두 선택했을 때
                                selectedDong &&
                                    selectedDong.dong !== null &&
                                    "bg-[#00A2FF] hover:bg-sky-400 text-white pointer-events-auto",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={() => {
                                initRegion();
                                setOpen(false);
                                handleClickSaveSelectedRegion();
                            }}
                        >
                            {depth === 3 ? "검색" : "완료"}
                        </Button>
                        <Button
                            onClick={() => {
                                if (depth === 3) {
                                    setOpen(false);
                                } else {
                                    setSearchContents(null);
                                    setSelectedSido(null);
                                    setSelectedSigugun(null);
                                }
                            }}
                            className='h-7 bg-[#EAEAEA] hover:bg-[#eeeeee] hover:opacity-80 text-black '
                        >
                            {depth === 3 ? "취소" : "초기화"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (open && isMobile) {
        return (
            <MobileRegionSelect
                loading={loading}
                setLoading={setLoading}
                setOpen={setOpen}
                selectedSido={selectedSido}
                selectedSigugun={selectedSigugun}
                selectedDong={selectedDong}
                setSelectedSido={setSelectedSido}
                setSelectedSigugun={setSelectedSigugun}
                setSelectedDong={setSelectedDong}
            />
        );
    }
};

export default RegionSelectorLayout;
