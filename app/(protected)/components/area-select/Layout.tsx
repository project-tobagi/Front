"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import _ from "lodash";

// * components
import DivideGroup from "../divides/DivideGroup";
import DividePanel from "../divides/DividePanel";
import { Button } from "@/components/ui/button";
import Icon from "../Icon";

// * etc
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
    const [selectedSido, setSelectedSido] = useState<string | any>(null);
    const [selectedSigugun, setSelectedSigugun] = useState<string | any>(null);
    const [selectedDong, setSelectedDong] = useState<string | any>(null);

    const initArea = () => {
        setSelectedSido(null);
        setSelectedSigugun(null);
        setSelectedDong(null);
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
                className='w-full h-48 absolute z-50 mt-1 shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 rounded-xl'
            >
                <div className='bg-white size-full flex flex-col justify-between rounded-xl'>
                    <DivideGroup className='size-full'>
                        <DividePanel
                            className='border-r-2 overflow-y-auto py-1.5'
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
                                                className={[
                                                    `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                    data.sido ===
                                                        selectedSido &&
                                                        "bg-gray-100 flex justify-between items-center",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                                onClick={() => {
                                                    setSelectedSido(data.sido);
                                                    setSelectedDong(null);
                                                    setSelectedSigugun(null);
                                                }}
                                            >
                                                {data.codeNm}
                                                {data.sido === selectedSido && (
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
                            className='border-r-2 overflow-y-auto py-1.5'
                            size={33.3}
                        >
                            {_.findIndex(areaData.sigugun, {
                                sido: selectedSido,
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
                                            if (selectedSido === data.sido) {
                                                return (
                                                    <li
                                                        className={[
                                                            `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                            data.sigugun ===
                                                                selectedSigugun &&
                                                                "bg-gray-100 flex justify-between items-center",
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ")}
                                                        onClick={() => {
                                                            setSelectedDong(
                                                                null
                                                            );
                                                            setSelectedSigugun(
                                                                data.sigugun
                                                            );
                                                        }}
                                                    >
                                                        {data.codeNm}
                                                        {data.sigugun ===
                                                            selectedSigugun && (
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
                                sigugun: selectedSigugun,
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
                                            if (
                                                selectedSido === data.sido &&
                                                selectedSigugun === data.sigugun
                                            ) {
                                                return (
                                                    <li
                                                        className={[
                                                            `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                                            data.dong ===
                                                                selectedDong &&
                                                                "bg-gray-100 flex justify-between items-center",
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ")}
                                                        onClick={() => {
                                                            setSelectedDong(
                                                                data.dong
                                                            );
                                                        }}
                                                    >
                                                        {data.codeNm}

                                                        {data.dong ===
                                                            selectedDong && (
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

                    <div className='flex justify-center gap-1.5 py-2 border-t-[1px] border-gray-300'>
                        <Button
                            className={[
                                "h-7 bg-[#00A2FF] hover:bg-sky-400 text-white",
                                selectedDong === null &&
                                    "bg-[#EAEAEA] text-black opacity-100 pointer-events-none",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={() => {
                                initArea();
                                setOpen(false);
                                setSearchContents(
                                    `${selectedSido} > ${selectedSigugun} > ${selectedDong}`
                                );
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
