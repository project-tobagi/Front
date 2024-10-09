"use client";

// * basic
import { useState } from "react";

// * install libraries
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

// * components
import Icon from "../../common/Icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CategoryPrevious,
    CategoryNext,
} from "@/components/ui/carousel";
import {
    addressState,
    locationState,
    midPointPlaceState,
} from "@/app/(protected)/_store/location";

// * etc
import { saveClipboardText } from "@/app/(protected)/_utils/clipboard";
import { menuState } from "@/app/(protected)/_store/menu";

const PlaceResult = ({
    stepFlow,
    placeResult,
    selectedCategory,
    filterCategory,
    setFilterCategory,
}: any) => {
    const address: any = useAtomValue(addressState);
    const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
    const [, setMenus] = useAtom(menuState);

    const [midPointPlace, setMidPointPlace]: any =
        useAtom<any>(midPointPlaceState);

    const generateNaverMapLink = (address: string) => {
        return `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
    };

    const generateKakaoMapLink = (address: string) => {
        return `https://map.kakao.com/link/search/${encodeURIComponent(
            address
        )}`;
    };

    return (
        <div className='h-full flex flex-col max-lg:mt-6'>
            <Carousel
                opts={{
                    align: "start",
                }}
                className='w-[calc(100%-50px)] mx-auto  max-w-sm mb-4'
            >
                <CarouselContent>
                    <CarouselItem className=' h-6'>
                        <div
                            className='p-1 cursor-pointer'
                            onClick={() => {
                                setFilterCategory(null);
                            }}
                        >
                            <span
                                className={[
                                    "font-semibold text-sm px-2.5 py-0.5 whitespace-nowrap ring-1 ring-gray-300 rounded-sm hover:ring-[#00A2FF]",
                                    filterCategory === null &&
                                        "text-white bg-[#00A2FF] ring-[#00A2FF]",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                전체
                            </span>
                        </div>
                    </CarouselItem>
                    {selectedCategory.map((ct: any, index: number) => (
                        <CarouselItem key={index} className=' h-6'>
                            <div
                                className='p-1 cursor-pointer'
                                onClick={() => {
                                    setFilterCategory(ct);
                                }}
                            >
                                <span
                                    className={[
                                        "font-semibold text-sm px-2.5 py-0.5 whitespace-nowrap ring-1 ring-gray-300 rounded-sm hover:ring-[#00A2FF]",
                                        filterCategory !== null &&
                                            ct.code === filterCategory.code &&
                                            "text-white bg-[#00A2FF] ring-[#00A2FF]",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {ct.type}
                                </span>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {
                    <div className='max-lg:hidden'>
                        <CategoryPrevious />
                        <CategoryNext />
                    </div>
                }
            </Carousel>

            <div className='flex flex-col justify-between h-full max-lg:px-6'>
                {/* contents */}
                {placeResult !== null ? (
                    <ScrollArea className='max-lg:h-[calc(100%-250px)] lg:h-[430px]'>
                        {_.map(placeResult, (place: any) => {
                            // 전체
                            if (filterCategory === null) {
                                return (
                                    <div
                                        onClick={() => {
                                            setMidPointPlace(place);

                                            if (isDesktop) {
                                                // setMenus((menus: any) => {
                                                //     return _.map(
                                                //         menus,
                                                //         (menu: any) => {
                                                //             if (menu.id === 0) {
                                                //                 return {
                                                //                     ...menu,
                                                //                     active: true,
                                                //                 };
                                                //             } else {
                                                //                 return {
                                                //                     ...menu,
                                                //                     active: false,
                                                //                 };
                                                //             }
                                                //         }
                                                //     );
                                                // });
                                            } else {
                                                stepFlow.next();
                                            }
                                        }}
                                        className={[
                                            "ring-1  hover:ring-black rounded-lg mt-1 mx-2 mb-3 px-3 py-2 cursor-pointer",
                                            midPointPlace?.id == place?.id
                                                ? "ring-[#00A2FF]"
                                                : "ring-gray-300",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        <div className='flex justify-between '>
                                            <div className='flex items-center gap-2'>
                                                <h1
                                                    title={place?.place_name}
                                                    className='max-lg:text-sm'
                                                >
                                                    {_.truncate(
                                                        place.place_name,
                                                        { length: 12 }
                                                    )}
                                                </h1>
                                                <p className='ring-1  h-4 ring-gray-300 rounded-full text-xs max-lg:text-[9px] text-gray-500 px-1 flex items-center '>
                                                    {place.category_group_name}
                                                </p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <a
                                                    href={generateNaverMapLink(
                                                        place.address_name +
                                                            " " +
                                                            place.place_name
                                                    )}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <button>
                                                        <Icon type='ic_naver_map' />
                                                    </button>
                                                </a>
                                                <a
                                                    href={generateKakaoMapLink(
                                                        place.address_name +
                                                            " " +
                                                            place.place_name
                                                    )}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <button>
                                                        <Icon type='ic_kakao_map' />
                                                    </button>
                                                </a>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-1 mt-1 text-xs'>
                                            <li className='flex items-center gap-2'>
                                                <h1 className=' px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs max-lg:text-[9px]'>
                                                    도로명
                                                </h1>
                                                <p>{place?.address_name}</p>
                                                <button
                                                    onClick={() => {
                                                        saveClipboardText(
                                                            place?.address_name,
                                                            "도로명",
                                                            toast
                                                        );
                                                    }}
                                                >
                                                    <Icon type='ic_copy_paste' />
                                                </button>
                                            </li>
                                            <li className='flex items-center gap-2'>
                                                <h1 className=' px-1 h-4 flex items-center ring-1  ring-black rounded-md text-xs max-lg:text-[9px]'>
                                                    지번
                                                </h1>
                                                <p>
                                                    {place?.road_address_name ||
                                                        "알 수 없음"}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        saveClipboardText(
                                                            place?.address_name,
                                                            "지번",
                                                            toast
                                                        );
                                                    }}
                                                >
                                                    <Icon type='ic_copy_paste' />
                                                </button>
                                            </li>
                                        </div>
                                    </div>
                                );
                            }

                            // 선택한 카테고리
                            if (
                                filterCategory !== null &&
                                filterCategory.code ===
                                    place.category_group_code
                            ) {
                                return (
                                    <div
                                        onClick={() => {
                                            setMidPointPlace(place);
                                        }}
                                        className={[
                                            "ring-1 hover:ring-black rounded-lg mt-1 mx-2 mb-3 px-3 py-2 cursor-pointer",
                                            midPointPlace?.id == place?.id
                                                ? "ring-[#00A2FF]"
                                                : "ring-gray-300",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        <div className='flex justify-between '>
                                            <div className='flex items-center gap-2'>
                                                <h1 title={place.place_name}>
                                                    {_.truncate(
                                                        place.place_name,
                                                        { length: 16 }
                                                    )}
                                                </h1>
                                                <p className='ring-1 h-4 ring-gray-300 rounded-full text-xs text-gray-500 px-1 flex items-center '>
                                                    {place.category_group_name}
                                                </p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <a
                                                    href={generateNaverMapLink(
                                                        place.address_name +
                                                            " " +
                                                            place.place_name
                                                    )}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <button>
                                                        <Icon type='ic_naver_map' />
                                                    </button>
                                                </a>
                                                <a
                                                    href={generateNaverMapLink(
                                                        place.address_name +
                                                            " " +
                                                            place.place_name
                                                    )}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <button>
                                                        <Icon type='ic_kakao_map' />
                                                    </button>
                                                </a>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-1 mt-1 text-xs'>
                                            <li className='flex items-center gap-2'>
                                                <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs'>
                                                    도로명
                                                </h1>
                                                <p>{place?.address_name}</p>
                                                <button
                                                    onClick={() => {
                                                        saveClipboardText(
                                                            address?.address_name,
                                                            "도로명",
                                                            toast
                                                        );
                                                    }}
                                                >
                                                    <Icon type='ic_copy_paste' />
                                                </button>
                                            </li>
                                            <li className='flex items-center gap-2'>
                                                <h1 className='px-1 h-4 flex items-center ring-1  ring-black rounded-md text-xs'>
                                                    지번
                                                </h1>
                                                <p>
                                                    {place?.road_address_name ||
                                                        "알 수 없음"}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        saveClipboardText(
                                                            address?.address_name,
                                                            "지번",
                                                            toast
                                                        );
                                                    }}
                                                >
                                                    <Icon type='ic_copy_paste' />
                                                </button>
                                            </li>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
                    </ScrollArea>
                ) : (
                    <div>검색 결과가 없습니다.</div>
                )}

                <div className='flex justify-end'>
                    <button
                        className='ring-1 rounded-full ring-gray-300 px-4 py-1'
                        onClick={() => {
                            stepFlow.reset();
                        }}
                    >
                        처음으로
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceResult;
