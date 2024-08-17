"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../common/Icon";
import DivideGroup from "../common/divides/DivideGroup";
import DividePanel from "../common/divides/DividePanel";

interface RegionSelector {
    depth: number;
    region: any;
    selectedSido: {
        sido: string;
        codeNm: string;
    };
    selectedSigugun: {
        sido: string;
        sigugun: null;
        codeNm: string;
    };
    selectedDong: {
        sido: string;
        sigugun: null;
        dong: null;
        codeNm: string;
    };
    setSelectedSido: any;
    setSelectedSigugun: any;
    setSelectedDong: any;
}

const RegionSelector = ({
    depth,
    region,
    selectedSido,
    selectedSigugun,
    selectedDong,
    setSelectedSido,
    setSelectedSigugun,
    setSelectedDong,
}: RegionSelector) => {
    const size = depth === 1 ? 100 : depth === 2 ? 50 : depth === 3 && 33.3;
    return (
        <DivideGroup className='size-full'>
            <DividePanel
                className='border-r-[1px] overflow-y-auto py-1.5'
                size={size}
            >
                <ul>
                    {_.map(
                        region.sido,
                        (data: { sido: string; codeNm: string }) => {
                            return (
                                <li
                                    key={`sido-${data.sido}`}
                                    className={[
                                        `py-1 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                                        data.sido === selectedSido?.sido &&
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
                                    <Icon
                                        w={3}
                                        h={3}
                                        type='ic_check'
                                        className={[
                                            data.sido === selectedSido?.sido
                                                ? "block"
                                                : "hidden",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    />
                                </li>
                            );
                        }
                    )}
                </ul>
            </DividePanel>
            {depth >= 2 && (
                <DividePanel
                    className='border-r-[1px] overflow-y-auto py-1.5'
                    size={size}
                >
                    {_.findIndex(region.sigugun, {
                        sido: selectedSido?.sido,
                    }) === -1 ? (
                        <div className='text-xs px-4 py-1 text-gray-400'>
                            도/특별시/광역시를 선택해주세요.
                        </div>
                    ) : (
                        <ul>
                            {_.map(
                                region.sigugun,
                                (data: {
                                    sido: string;
                                    sigugun: string;
                                    codeNm: string;
                                }) => {
                                    // 선택한 시도에 해당되는 시군구
                                    if (selectedSido?.sido === data.sido) {
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
                                                    setSelectedSigugun(data);
                                                }}
                                            >
                                                {data.codeNm}

                                                <Icon
                                                    w={3}
                                                    h={3}
                                                    type='ic_check'
                                                    className={[
                                                        data.sigugun ===
                                                        selectedSigugun?.sigugun
                                                            ? "block"
                                                            : "hidden",
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ")}
                                                />
                                            </li>
                                        );
                                    }
                                }
                            )}
                        </ul>
                    )}
                </DividePanel>
            )}
            {depth >= 3 && (
                <DividePanel className='overflow-y-auto py-1.5' size={size}>
                    {_.findIndex(region.dong, {
                        sigugun: selectedSigugun?.sigugun,
                    }) === -1 ? (
                        <div className='text-xs px-4 py-1 text-gray-400'>
                            시/군/구를 선택해주세요.
                        </div>
                    ) : (
                        <ul>
                            {_.map(
                                region.dong,
                                (data: {
                                    sido: string;
                                    sigugun: string;
                                    dong: string;
                                    codeNm: string;
                                }) => {
                                    // 선택한 시도/시군구에 해당되는 동
                                    if (
                                        selectedSido.sido === data.sido &&
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
                                                    setSelectedDong(data);
                                                }}
                                            >
                                                {data.codeNm}

                                                <Icon
                                                    w={3}
                                                    h={3}
                                                    type='ic_check'
                                                    className={[
                                                        data.dong ===
                                                        selectedDong?.dong
                                                            ? "block"
                                                            : "hidden",
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ")}
                                                />
                                            </li>
                                        );
                                    }
                                }
                            )}
                        </ul>
                    )}
                </DividePanel>
            )}
        </DivideGroup>
    );
};

export default RegionSelector;
