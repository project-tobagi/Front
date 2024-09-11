"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../common/Icon";
import DivideGroup from "../common/divides/DivideGroup";
import DividePanel from "../common/divides/DividePanel";
import { useAtomValue } from "jotai";
import { regionDataState } from "../../_store/region";

interface RegionSelect {
    depth: number;
    region: any;
    selectedSido: {
        si: string;
        guList: any;
    };
    selectedSigugun: {
        gu: string;
        dongList: any;
    };
    selectedDong: {
        dong: string;
        code: string;
    };
    setSelectedSido: any;
    setSelectedSigugun: any;
    setSelectedDong: any;
}

const RegionSelect = ({
    depth,
    region,
    selectedSido,
    selectedSigugun,
    selectedDong,
    setSelectedSido,
    setSelectedSigugun,
    setSelectedDong,
}: RegionSelect) => {
    const size = depth === 1 ? 100 : depth === 2 ? 50 : depth === 3 && 33.3;

    const regionData = useAtomValue(regionDataState);
    return (
        <DivideGroup className='size-full'>
            <DividePanel
                className='border-r-[1px] overflow-y-auto py-1.5'
                size={size}
            >
                {_.map(regionData, (data: any, index: number) => {
                    return (
                        <div key={index}>
                            <div
                                className={[
                                    `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                    data.si === selectedSido?.si &&
                                        "bg-gray-100 flex justify-between items-center",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                onClick={() => {
                                    setSelectedSido(data);
                                }}
                            >
                                {data.si}
                            </div>
                        </div>
                    );
                })}
            </DividePanel>

            {selectedSido !== null && (
                <DividePanel
                    className='border-r-[1px] overflow-y-auto py-1.5'
                    size={size}
                >
                    {_.map(selectedSido.guList, (data: any, index: number) => {
                        return (
                            <div key={index}>
                                <div
                                    className={[
                                        `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                        data.gu === selectedSigugun?.gu &&
                                            "bg-gray-100 flex justify-between items-center",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() => {
                                        setSelectedSigugun(data);
                                    }}
                                >
                                    {data.gu}
                                </div>
                            </div>
                        );
                    })}
                </DividePanel>
            )}

            {selectedSigugun !== null && (
                <DividePanel
                    className='border-r-[1px] overflow-y-auto py-1.5'
                    size={size}
                >
                    {_.map(
                        selectedSigugun.dongList,
                        (data: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div
                                        className={[
                                            `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                            data.dong === selectedDong?.dong &&
                                                "bg-gray-100 flex justify-between items-center",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        onClick={() => {
                                            setSelectedDong(data);
                                        }}
                                    >
                                        {data.dong}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </DividePanel>
            )}
        </DivideGroup>
    );
};

export default RegionSelect;
