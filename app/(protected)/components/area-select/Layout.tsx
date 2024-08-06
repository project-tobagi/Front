"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import _ from "lodash";
import { useAtom } from "jotai";

// * components
import DivideGroup from "../divides/DivideGroup";
import DividePanel from "../divides/DividePanel";
import { Button } from "@/components/ui/button";
import Icon from "../Icon";

// * etc
import { areaData } from "@/app/(protected)/_utils/hangjungdong";
import { locationState } from "../../_store/location";

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

    const [location, setLocation] = useAtom(locationState);

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
        setSearchContents(() => {
            if (selectedDong?.dong === null && selectedDong?.codeNm === null) {
                return [selectedSido.codeNm, ">", selectedSigugun.codeNm];
            } else {
                return [
                    selectedSido.codeNm,
                    ">",
                    selectedSigugun.codeNm,
                    ">",
                    selectedDong?.codeNm,
                ];
            }
        });

        setLocation(() => {
            if (selectedDong?.dong === null && selectedDong?.codeNm === null) {
                return selectedSido?.codeNm + " " + selectedSigugun?.codeNm;
            } else {
                return (
                    selectedSido?.codeNm +
                    " " +
                    selectedSigugun?.codeNm +
                    " " +
                    selectedDong?.codeNm
                );
            }
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
                    <DivideGroup className='size-full'>
                        <DividePanel
                            className='border-r-[1px] overflow-y-auto py-1.5'
                            size={33.3}
                        >
                            <ul>
                                {_.map(
                                    areaData.sido,
                                    (data: {
                                        sido: string;
                                        codeNm: string;
                                    }) => {
                                        return (
                                            <li
                                                key={`sido-${data.sido}`}
                                                className={[
                                                    `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                    data.sido ===
                                                        selectedSido?.sido &&
                                                        "bg-gray-100 flex justify-between items-center",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                                onClick={() => {
                                                    setSelectedSido(data);
                                                    setSelectedDong({
                                                        sido: null,
                                                        sigugun: null,
                                                        dong: null,
                                                        codeNm: null,
                                                    });
                                                    setSelectedSigugun(null);
                                                }}
                                            >
                                                {data.codeNm}
                                                {data.sido ===
                                                    selectedSido?.sido && (
                                                    <Icon
                                                        w={3}
                                                        h={3}
                                                        type='ic_check'
                                                    />
                                                )}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </DividePanel>
                        <DividePanel
                            className='border-r-[1px] overflow-y-auto py-1.5'
                            size={33.3}
                        >
                            {_.findIndex(areaData.sigugun, {
                                sido: selectedSido?.sido,
                            }) === -1 ? (
                                <div className='text-xs px-4 py-1 text-gray-400'>
                                    도/특별시/광역시를 선택해주세요.
                                </div>
                            ) : (
                                <ul>
                                    {_.map(
                                        areaData.sigugun,
                                        (data: {
                                            sido: string;
                                            sigugun: string;
                                            codeNm: string;
                                        }) => {
                                            // 선택한 시도에 해당되는 시군구
                                            if (
                                                selectedSido?.sido === data.sido
                                            ) {
                                                return (
                                                    <li
                                                        key={`sigugun-${data.sigugun}`}
                                                        className={[
                                                            `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                            data.sigugun ===
                                                                selectedSigugun?.sigugun &&
                                                                "bg-gray-100 flex justify-between items-center",
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ")}
                                                        onClick={() => {
                                                            setSelectedDong({
                                                                sido: null,
                                                                sigugun: null,
                                                                dong: null,
                                                                codeNm: null,
                                                            });
                                                            setSelectedSigugun(
                                                                data
                                                            );
                                                        }}
                                                    >
                                                        {data.codeNm}
                                                        {data.sigugun ===
                                                            selectedSigugun?.sigugun && (
                                                            <Icon
                                                                w={3}
                                                                h={3}
                                                                type='ic_check'
                                                            />
                                                        )}
                                                    </li>
                                                );
                                            }
                                        }
                                    )}
                                </ul>
                            )}
                        </DividePanel>
                        <DividePanel
                            className='overflow-y-auto py-1.5'
                            size={33.3}
                        >
                            {_.findIndex(areaData.dong, {
                                sigugun: selectedSigugun?.sigugun,
                            }) === -1 ? (
                                <div className='text-xs px-4 py-1 text-gray-400'>
                                    시/군/구를 선택해주세요.
                                </div>
                            ) : (
                                <ul>
                                    {_.map(
                                        areaData.dong,
                                        (data: {
                                            sido: string;
                                            sigugun: string;
                                            dong: string;
                                            codeNm: string;
                                        }) => {
                                            // 선택한 시도/시군구에 해당되는 동
                                            if (
                                                selectedSido.sido ===
                                                    data.sido &&
                                                selectedSigugun?.sigugun ===
                                                    data.sigugun
                                            ) {
                                                return (
                                                    <li
                                                        key={`dong-${data.dong}`}
                                                        className={[
                                                            `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                            data.dong ===
                                                                selectedDong?.dong &&
                                                                "bg-gray-100 flex justify-between items-center",
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ")}
                                                        onClick={() => {
                                                            setSelectedDong(
                                                                data
                                                            );
                                                        }}
                                                    >
                                                        {data.codeNm}

                                                        {data.dong ===
                                                            selectedDong?.dong && (
                                                            <Icon
                                                                w={3}
                                                                h={3}
                                                                type='ic_check'
                                                            />
                                                        )}
                                                    </li>
                                                );
                                            }
                                        }
                                    )}
                                </ul>
                            )}
                        </DividePanel>
                    </DivideGroup>

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
