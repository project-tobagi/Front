"use client";

import { useState } from "react";
import axios from "axios";
import Maps from "./Maps";
import Script from "next/script";

const Home = () => {
    const [formData, setFormData] = useState({ start: "", end: "" });
    const [midpoint, setMidpoint]: any = useState(null);
    const [places, setPlaces]: any = useState([]);
    const [subwayStation, setSubwayStation] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { start, end } = formData;

        try {
            const startLocation = await getCoordinates(start);
            const endLocation = await getCoordinates(end);

            console.log(startLocation, endLocation);

            const midpoint = {
                lat: (startLocation.lat + endLocation.lat) / 2,
                lng: (startLocation.lng + endLocation.lng) / 2,
            };

            setMidpoint(midpoint);

            const nearbyPlaces = await getNearbyPlaces(
                midpoint.lat,
                midpoint.lng
            );

            const nearbySubway = await getNearestSubwayStation(
                midpoint.lat,
                midpoint.lng
            );

            console.log(nearbySubway);

            setPlaces(nearbyPlaces);
            setSubwayStation(nearbySubway);
        } catch (error) {
            console.error("Error finding midpoint or places:", error);
        }
    };

    const getCoordinates = async (address: any) => {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json`,
            {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_APP_KEY}`,
                    KA: "sdk/1.0 os/javascript lang/ko device/desktop origin/http://localhost:3002",
                },
            }
        );

        console.log(response);

        const { x, y } = response.data.documents[0].address;
        return { lat: parseFloat(y), lng: parseFloat(x) };
    };

    const getNearbyPlaces = async (lat: any, lng: any) => {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/category.json`,
            {
                params: {
                    category_group_code: "FD6", // 음식점
                    x: lng,
                    y: lat,
                    radius: 2000, // 검색 반경 (미터 단위)
                    sort: "accuracy", // 정렬 기준 (accuracy 또는 distance)
                },
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_APP_KEY}`,
                    KA: "sdk/1.0 os/javascript lang/ko device/desktop origin/http://localhost:3002",
                },
            }
        );

        return response.data.documents.map((doc: any) => ({
            name: doc.place_name,
            x: doc.x,
            y: doc.y,
            address: doc.address_name,
            url: doc.place_url,
        }));
    };

    const getNearestSubwayStation = async (lat: number, lng: number) => {
        try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/search/category.json`,
                {
                    params: {
                        category_group_code: "SW8", // 지하철역
                        x: lng,
                        y: lat,
                        radius: 10000, // 검색 반경 (미터 단위)
                        sort: "distance", // 거리 기준 정렬
                    },
                    headers: {
                        Authorization: `KakaoAK ${process.env.KAKAO_APP_KEY}`,
                        KA: "sdk/1.0 os/javascript lang/ko device/desktop origin/http://localhost:3002",
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

    return (
        <div>
            {/* <div className=''>
                <h1>중간 지점 찾기</h1>
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
            </div> */}

            <Script
                src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`} // autoload 파라메터는 false로 지정
                onLoad={() => {
                    kakao.maps.load(() => {
                        setLoaded(true);
                    });
                }} // 동적으로 로드
            />

            <div className=''>
                {loaded && (
                    <Maps
                        midpoint={midpoint}
                        places={places}
                        subwayStation={subwayStation}
                    />
                )}
            </div>

            {/* <div>
                <h2>추천 장소</h2>
                <ul>
                    {places.map((place: any, index: number) => (
                        <li key={index}>
                            <a
                                href={place.url}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {place.name} - {place.address}
                            </a>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default Home;
