"use client";

// * basic
import { useState } from "react";

// * install libraries
import axios from "axios";
import { useAtom } from "jotai";
import _ from "lodash";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

// * state
import { midPointState } from "../../_store/location";

// * components
import Icon from "../common/Icon";
import { Button } from "@/components/ui/button";

// * etc
import { CATEGORY_GROUP_CODES } from "../../_utils/constants";

const RegionMidpointForm = () => {
    const [formData, setFormData] = useState({ start: "", end: "" });
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [, setMidPoint] = useAtom(midPointState);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const getNearestPlace = async (lat: number, lng: number) => {
        try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/search/category.json`,
                {
                    params: {
                        category_group_code: selectedCategory, // 지하철역
                        x: lng,
                        y: lat,
                        radius: 10000, // 검색 반경 (미터 단위)
                        sort: "distance", // 거리 기준 정렬
                    },
                    headers: {
                        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                        // KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_REST_API_KEY}`,
                    },
                }
            );

            if (response.data.documents.length > 0) {
                // 가장 가까운 지하철역 정보 반환
                return response.data.documents[0];
            } else {
                toast.error(
                    <div className='text-xs'>
                        해당 두 장소사이에 중간지점이 존재하지 않습니다.
                    </div>,
                    {
                        position: "top-right",
                    }
                );
            }
        } catch (error) {
            // toast.warn(
            //     <div className='text-xs'>
            //         해당 두 장소사이에 중간지점이 존재하지 않습니다.
            //     </div>,
            //     {
            //         position: "top-right",
            //     }
            // );
        }
    };

    const getCoordinates = async (address: any) => {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json`,
            {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                    // KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_REST_API_KEY}`,
                },
            }
        );

        if (response.data.documents.length === 0) {
            toast.warn(
                <div className='text-xs'>
                    선택한 출발지와 도착지가 올바르지 않습니다.
                </div>,
                {
                    position: "top-right",
                }
            );
        }

        const { x, y } = response.data.documents[0].address;

        return { lat: parseFloat(y), lng: parseFloat(x) };
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { start, end } = formData;

        try {
            const startLocation = await getCoordinates(start);
            const endLocation = await getCoordinates(end);

            const midpoint = {
                lat: (startLocation.lat + endLocation.lat) / 2,
                lng: (startLocation.lng + endLocation.lng) / 2,
            };

            const midpointPlace = await getNearestPlace(
                midpoint.lat,
                midpoint.lng
            );

            setMidPoint(midpointPlace);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // header
        <div className='h-[calc(100%-25px)] flex gap-6 flex-col'>
            <div className='text-center mt-3'>
                <h1 className='text-lg font-semibold'>
                    가장 빠르게 갈 수 있는 중간 지점을 찾아 드려요.
                </h1>
                <p className='text-sm text-[#808185] font-light'>
                    두 지점의 출발지를 설정하여 자동차, 대중교통으로 <br />
                    가장 빠르게 갈 수 있는 중간 지점을 찾아보세요.
                </p>
            </div>

            {/* contents */}
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 h-full'
            >
                <div className='w-full'>
                    <label className='text-xs text-gray-500 ml-2' htmlFor=''>
                        카테고리 지정
                    </label>
                    <Select
                        required
                        onValueChange={(e) => {
                            setSelectedCategory(e);
                        }}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='카테고리 선택해주세요.' />
                        </SelectTrigger>
                        <SelectContent>
                            {_.map(CATEGORY_GROUP_CODES, (item: any) => {
                                return (
                                    <SelectItem value={item.code}>
                                        {item.type}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className='relative w-full '>
                    <label className='text-xs text-gray-500 ml-2' htmlFor=''>
                        출발 지점
                    </label>
                    <div className='relative w-full'>
                        <Icon
                            className='absolute top-[50%] translate-y-[-50%] left-3'
                            type='ic_search'
                        />

                        <input
                            className='w-full rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                            placeholder='출발지를 입력해주세요.'
                            type='text'
                            value={formData.start}
                            onChange={handleChange}
                            required
                            name='start'
                        />
                    </div>
                </div>

                <div className='relative w-full'>
                    <label className='text-xs text-gray-500 ml-2' htmlFor=''>
                        도착 지점
                    </label>
                    <div className='relative w-full'>
                        <Icon
                            className='absolute top-[50%] translate-y-[-50%] left-3'
                            type='ic_search'
                        />

                        <input
                            className='w-full rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                            placeholder='도착지를 입력해주세요.'
                            type='text'
                            value={formData.end}
                            onChange={handleChange}
                            required
                            name='end'
                        />
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

export default RegionMidpointForm;
