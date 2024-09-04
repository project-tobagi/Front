"use client";

// * install libraries
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";

// * components
import Icon from "../../common/Icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    addressState,
    locationState,
    midPointPlaceState,
} from "@/app/(protected)/_store/location";

const PlaceResult = ({ stepFlow, placeResult }: any) => {
    const address: any = useAtomValue(addressState);
    const [, setMidPointPlace] = useAtom(midPointPlaceState);
    return (
        <div className='h-full flex flex-col '>
            {/* 카테고리 slider */}
            <div className='w-1/2 m-auto hidden'>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className='w-full max-w-sm'
                >
                    <CarouselContent>
                        <ul className='flex gap-2'>
                            <li>전체</li>
                            <li>음식점</li>
                            <li>카페</li>
                        </ul>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className='flex flex-col justify-between h-full'>
                {/* contents */}
                {placeResult !== null ? (
                    <ScrollArea className='h-[400px]'>
                        {_.map(placeResult, (place: any) => {
                            console.log(place);
                            return (
                                <div
                                    onClick={() => {
                                        setMidPointPlace(place);
                                    }}
                                    className='ring-1 ring-gray-300 hover:ring-[#00A2FF] rounded-lg mt-1 mx-2 mb-3 p-2 cursor-pointer'
                                >
                                    <div className='flex justify-between '>
                                        <div className='flex items-center gap-2'>
                                            <h1>{place.address_name}</h1>
                                            <p className='ring-1 h-4 ring-gray-300 rounded-full text-xs text-gray-500 px-1 flex items-center '>
                                                {place.category_group_name}
                                            </p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button>
                                                <Icon type='ic_naver_map' />
                                            </button>
                                            <button>
                                                <Icon type='ic_kakao_map' />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1 mt-1'>
                                        <li className='flex items-center gap-2'>
                                            <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs'>
                                                도로명
                                            </h1>
                                            <p>{address?.road_address_name}</p>
                                            <button>
                                                <Icon type='ic_copy_paste' />
                                            </button>
                                        </li>
                                        <li className='flex items-center gap-2'>
                                            <h1 className='px-1 h-4 flex items-center ring-1  ring-black rounded-md text-xs'>
                                                지번
                                            </h1>
                                            <p>{address?.address_name}</p>
                                            <button>
                                                <Icon type='ic_copy_paste' />
                                            </button>
                                        </li>
                                    </div>
                                </div>
                            );
                        })}
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
