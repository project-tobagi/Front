"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import _ from "lodash";
import { useAtom } from "jotai";

// * components
import { Button } from "@/components/ui/button";
import RegionSelect from "./Select";

// * etc
import { locationState } from "../../_store/location";
import { region } from "@/app/(protected)/_utils/hangjungdong";

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
    const [, setLocation] = useAtom(locationState);
    const [selectedSido, setSelectedSido] = useState<any>(null);

    const [selectedSigugun, setSelectedSigugun] = useState<any>(null);

    const [selectedDong, setSelectedDong] = useState<any>(null);

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
        }
    }, [open]);

    if (open) {
        return (
            <div
                ref={selectorRef}
                className='w-full h-48 absolute z-50 mt-1.5 shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 rounded-xl'
            >
                <div className='bg-white size-full flex flex-col justify-between rounded-xl'>
                    {/* 동네 선택 폼 */}
                    {/* <Selector
                        depth={depth}
                        region={region}
                        selectedSido={selectedSido}
                        selectedSigugun={selectedSigugun}
                        selectedDong={selectedDong}
                        setSelectedSido={setSelectedSido}
                        setSelectedSigugun={setSelectedSigugun}
                        setSelectedDong={setSelectedDong}
                    /> */}
                    <RegionSelect
                        depth={depth}
                        region={region}
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

                                // 선택한 시군구가 있으면서 그에 해당하는 동이 없을때
                                selectedSigugun &&
                                    selectedSigugun.sigugun !== null &&
                                    _.findIndex(region.dong, {
                                        sigugun: selectedSigugun.sigugun,
                                    }) === -1 &&
                                    "bg-[#00A2FF] hover:bg-sky-400 text-white pointer-events-auto",
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
};

export default RegionSelectorLayout;
