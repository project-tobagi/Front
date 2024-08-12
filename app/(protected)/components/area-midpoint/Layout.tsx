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

// * state
import { midPointState } from "../../_store/location";

// * etc
import { CATEGORY_GROUP_CODES } from "../../_utils/constants";

const AreaMidPoingLayout = () => {
    const [formData, setFormData] = useState({ start: "", end: "" });
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [, setMidPoint] = useAtom(midPointState);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const getNearestSubwayStation = async (lat: number, lng: number) => {
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
                throw new Error(
                    "No subway stations found within the specified radius."
                );
            }
        } catch (error) {
            console.error("Error fetching nearest subway station:", error);
            throw error;
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

            const midpointPlace = await getNearestSubwayStation(
                midpoint.lat,
                midpoint.lng
            );

            setMidPoint(midpointPlace);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>출발지:</label>
                        <input
                            type='text'
                            name='start'
                            value={formData.start}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>도착지:</label>
                        <input
                            type='text'
                            name='end'
                            value={formData.end}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit'>중간 지점 찾기</button>
                </form>

                <Select
                    onValueChange={(e) => {
                        setSelectedCategory(e);
                    }}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Theme' />
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
        </div>
    );
};

export default AreaMidPoingLayout;
