"use client";

// * basic
import { useState, useRef, useEffect, useCallback } from "react";

// * install libraries
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import _, { debounce } from "lodash";

import { toast } from "react-toastify";

// * state
import {
    addressState,
    midPointState,
    relatedSearchListState,
} from "../../../_store/location";

// * components
import Icon from "../../common/Icon";
import Descriptions from "../Descriptions";
import { Button } from "@/components/ui/button";

// * etc
import {
    getCoordinates,
    getAddress,
    getNearestPlace,
} from "@/app/(protected)/_api/map";
import RelatedSearch from "../RelatedSearch";

const defaultStartPoints = [{ name: "" }, { name: "" }];

const MidpointForm = ({ stepFlow }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<any>(null);
    const [startPoints, setStartPoints] = useState(defaultStartPoints);
    const [, setAddress] = useAtom(addressState);
    const [, setMidpoint] = useAtom(midPointState);
    const [relatedSearchList, setRelatedSearchList] = useAtom(
        relatedSearchListState
    );

    const [searchTerm, setSearchTerm] = useState<any>("");

    const [open, setOpen] = useState({ visible: false, index: 0 });
    const inputRef = useRef<any>(null);

    // 검색 함수를 debounce로 감싸줍니다.
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            const ps = new kakao.maps.services.Places();
            ps.keywordSearch(term, (data: any, status, _pagination): any => {
                if (status === kakao.maps.services.Status.OK) {
                    const bounds = new kakao.maps.LatLngBounds();
                    let markers = [];

                    for (let i = 0; i < data.length; i++) {
                        markers.push({
                            position: {
                                lat: data[i].y,
                                lng: data[i].x,
                            },
                            content: data[i].place_name,
                        });
                        bounds.extend(
                            new kakao.maps.LatLng(data[i].y, data[i].x)
                        );
                    }

                    // 연관검색어 set
                    setRelatedSearchList(data);
                }
            });
        }, 300),
        []
    );

    // searchTerm이 변경될 때마다 debouncedSearch를 호출합니다.
    useEffect(() => {
        if (searchTerm.length > 0) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm, debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setRelatedSearchList([]);
                setOpen((prev) => ({ ...prev, visible: false }));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);

        setTimeout(() => {
            if (newValue == "") {
                setRelatedSearchList([]);
            }
        }, 300);

        setStartPoints((prev: any[]) => {
            return prev.map((item: any, i: number) => {
                if (index === i) {
                    return { ...item, name: newValue };
                } else {
                    return item;
                }
            });
        });
    };

    const handleClickAddStartPoint = () => {
        // 최대 5개
        if (startPoints.length < 5) {
            setStartPoints((prev: any) => {
                return [...prev, { name: "" }];
            });
        }
    };

    const handleClickGetLocation = async (index: number) => {
        try {
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

                        stepFlow.loadingEnd();
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        } catch (error) {
            stepFlow.loadingEnd();
            console.log(error);
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
        <div
            className={[
                "h-full flex gap-6 flex-col relative",
                stepFlow.loading && "opacity-40",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <Descriptions
                title='가장 빠르게 갈 수 있는 중간 지점을 찾아 드려요.'
                subTitle={`두 지점의 출발지를 설정하여\n가장 빠르게 갈 수 있는 중간 지점을 찾아보세요.`}
            />

            {/* contents */}
            <form
                onSubmit={handleSubmit}
                className='flex flex-col h-full justify-between'
            >
                <div className='flex flex-col gap-4'>
                    <div
                        ref={scrollRef}
                        className='flex flex-col overflow-y-auto gap-4 max-h-[260px] pb-2 w-full'
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

                                        <div className=' w-full'>
                                            <input
                                                className='w-full rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                                                placeholder='출발지를 입력해주세요.'
                                                autoComplete='off'
                                                type='text'
                                                value={startPoints[index].name}
                                                onChange={(e) => {
                                                    handleChange(e, index);
                                                }}
                                                onFocus={() => {
                                                    setOpen({
                                                        visible: true,
                                                        index: index,
                                                    });
                                                }}
                                                required
                                                name='start'
                                                ref={inputRef}
                                            />
                                            {open.visible &&
                                                relatedSearchList.length > 0 &&
                                                index === open.index && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className='w-[278px] max-h-40 ring-1 rounded-lg ring-gray-300 fixed z-50 bg-white overflow-y-auto '
                                                    >
                                                        <RelatedSearch
                                                            currentIndex={index}
                                                            setStartPoints={
                                                                setStartPoints
                                                            }
                                                            setOpen={setOpen}
                                                        />
                                                    </div>
                                                )}
                                        </div>

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
                                                stepFlow.loadingStart();
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
