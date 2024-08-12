"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import _ from "lodash";
import { useAtom } from "jotai";

// * components
import Icon from "../common/Icon";
import { Button } from "@/components/ui/button";
import DivideGroup from "../common/divides/DivideGroup";
import DividePanel from "../common/divides/DividePanel";
import AreaSelector from "./AreaSelector";

// * etc
import { locationState } from "../../_store/location";
import { areaData } from "@/app/(protected)/_utils/hangjungdong";

const AreaSelectorLayout = ({
    open,
    setOpen,
    selectorRef,
    setSearchContents,
}: {
    open: boolean;
    setOpen: any;
    selectorRef: any;
    setSearchContents: any;
}) => {
    const [, setLocation] = useAtom(locationState);
    const [selectedSido, setSelectedSido] = useState<any>({
        sido: null,
        codeNm: null,
    });

    const [selectedSigugun, setSelectedSigugun] = useState<any>({
        sido: null,
        sigugun: null,
        codeNm: null,
    });

    const [selectedDong, setSelectedDong] = useState<any>({
        sido: null,
        sigugun: null,
        dong: null,
        codeNm: null,
    });

    const initArea = () => {
        setSelectedSido({
            sido: null,
            codeNm: null,
        });
        setSelectedSigugun({
            sido: null,
            sigugun: null,
            codeNm: null,
        });
        setSelectedDong({
            sido: null,
            sigugun: null,
            dong: null,
            codeNm: null,
        });
    };

    // 선택한 동네 저장
    const handleClickSaveSelectedArea = () => {
        const { codeNm: sidoNm } = selectedSido || {};
        const { codeNm: sigugunNm } = selectedSigugun || {};
        const { codeNm: dongNm } = selectedDong || {};

        const searchContents = [sidoNm, ">", sigugunNm];
        if (dongNm) searchContents.push(">", dongNm);
        setSearchContents(searchContents);

        setLocation({
            sido: sidoNm,
            sigugun: sigugunNm,
            dong: dongNm,
        });
    };

    useEffect(() => {
        if (!open) {
            initArea();
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
                    <AreaSelector
                        areaData={areaData}
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
                                    _.findIndex(areaData.dong, {
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
                                initArea();
                                setOpen(false);
                                handleClickSaveSelectedArea();
                            }}
                        >
                            검색
                        </Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            className='h-7 bg-[#EAEAEA] hover:bg-[#eeeeee] hover:opacity-80 text-black '
                        >
                            취소
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default AreaSelectorLayout;
