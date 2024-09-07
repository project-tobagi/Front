"use client";

// * basic
import { useState, useRef, useEffect } from "react";

// * install libraries
import axios from "axios";
import { useAtom } from "jotai";
import _ from "lodash";

import { toast } from "react-toastify";

// * state
import { addressState, midPointState } from "../../../_store/location";

// * components
import Icon from "../../common/Icon";
import Descriptions from "../Descriptions";
import { Button } from "@/components/ui/button";

// * etc
import {
    getCoordinates,
    getAddress,
    getNearestPlace,
} from "@/app/(protected)/_utils/midpoint";

const defaultStartPoints = [{ name: "" }, { name: "" }];

const MidpointForm = ({ stepFlow }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [startPoints, setStartPoints] = useState(defaultStartPoints);

    const [, setAddress] = useAtom(addressState);
    const [, setMidpoint] = useAtom(midPointState);

    const handleChange = (e: any, index: number) => {
        setStartPoints((prev: any) => {
            return _.map(prev, (item: any, i: number) => {
                if (index === i) {
                    return { name: e.target.value };
                } else {
                    return item;
                }
            });
        });
    };

    const handleClickAddStartPoint = () => {
        setStartPoints((prev: any) => {
            return [...prev, { name: "" }];
        });
    };

    const handleClickGetLocation = async (index: number) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const my_address: any = await getAddress(
                        {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        toast,
                        null
                    );

                    setStartPoints((prev: any) => {
                        return _.map(prev, (item: any, i: number) => {
                            if (index === i) {
                                return { name: my_address.address_name };
                            } else {
                                return item;
                            }
                        });
                    });
                },
                (error) => {
                    console.log(error.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const handleClickDeleteStartPoint = (index: number) => {
        if (index !== 0 && index !== 1) {
            setStartPoints((prev: any) => {
                return _.filter(prev, (item, i: number) => {
                    return index !== i;
                });
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // 모든 출발지 좌표를 가져옵니다.
            const startLocations = await Promise.all(
                startPoints.map((point: any) =>
                    getCoordinates(point.name, toast)
                )
            );

            // 모든 출발지의 위도와 경도의 총합을 계산합니다.
            const midpoint: any = startLocations.reduce(
                (acc, location) => {
                    acc.lat += location.lat;
                    acc.lng += location.lng;
                    return acc;
                },
                { lat: 0, lng: 0 }
            );

            // 출발지 개수로 나누어 평균을 구합니다.
            midpoint.lat /= startLocations.length;
            midpoint.lng /= startLocations.length;

            setMidpoint(midpoint);

            await getAddress(midpoint, toast, setAddress);

            stepFlow.next();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // 새로운 시작 지점이 추가된 후에 실행
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [startPoints]);

    return (
        // header
        <div className='h-full flex gap-6 flex-col '>
            <Descriptions
                title='가장 빠르게 갈 수 있는 중간 지점을 찾아 드려요.'
                subTitle={`두 지점의 출발지를 설정하여\n가장 빠르게 갈 수 있는 중간 지점을 찾아보세요.`}
            />

            {/* contents */}
            <form
                onSubmit={handleSubmit}
                className='flex flex-col  h-full justify-between'
            >
                <div className='flex flex-col gap-4  '>
                    <div
                        ref={scrollRef}
                        className='flex flex-col gap-4 overflow-y-auto max-h-[260px] pb-2 w-full'
                    >
                        {_.map(startPoints, (item: any, index: number) => {
                            return (
                                <div className='relative w-full flex gap-4 items-center'>
                                    <label
                                        className='text-xs  ml-2 whitespace-nowrap'
                                        htmlFor=''
                                    >
                                        출발지 {index + 1}
                                    </label>
                                    <div className='relative w-full flex items-center gap-2'>
                                        <Icon
                                            className='absolute top-[50%] translate-y-[-50%] left-3'
                                            type='ic_search'
                                        />

                                        <input
                                            className='w-full rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                                            placeholder='출발지를 입력해주세요.'
                                            type='text'
                                            value={startPoints[index].name}
                                            onChange={(e) => {
                                                handleChange(e, index);
                                            }}
                                            required
                                            name='start'
                                        />

                                        {index !== 0 && index !== 1 && (
                                            <div
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    handleClickDeleteStartPoint(
                                                        index
                                                    );
                                                }}
                                            >
                                                x
                                            </div>
                                        )}

                                        <div
                                            className='cursor-pointer'
                                            onClick={() => {
                                                handleClickGetLocation(index);
                                            }}
                                        >
                                            <Icon type='ic_my_location' />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* 출발지 추가하기 */}
                    <div
                        onClick={() => {
                            handleClickAddStartPoint();
                        }}
                        className='flex gap-3 justify-center items-center mt-3 hover:text-[#00A2FF] group cursor-pointer'
                    >
                        <p className='w-6 h-6 ring-1 ring-black group-hover:bg-[#00A2FF] hover:ring-[#00A2FF] rounded-full flex items-center justify-center text-xl pb-0.5 group-hover:text-white group-hover:ring-[#00A2FF]'>
                            +
                        </p>
                        <h1>출발지 추가하기</h1>
                    </div>
                </div>

                {/* buttons */}
                <div className='flex justify-center h-full items-end'>
                    <Button type='submit' className='rounded-full px-6'>
                        중간지점탐색
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MidpointForm;
