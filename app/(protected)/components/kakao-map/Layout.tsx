"use client";

// * basic
import { useEffect, useState } from "react";
import Script from "next/script";

// * install libraries
import axios from "axios";
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";

// * state
import {
    locationState,
    midPointPlaceState,
    midPointState,
} from "../../_store/location";

// * components
import Maps from "./Maps";
import { API_RESION_POLYGON } from "../../_api";

/**
 * @param location '', 선택한 동네 (ex:대구광역시 북구 태전동)
 * @param coordinates {center:{lat:0,lng:0}, isPanto: false}, 선택한 동네 좌표
 * @returns
 */

const KakaoMapLayout = () => {
    const midPointPlace = useAtomValue<any>(midPointPlaceState);

    const [formData, setFormData] = useState({ start: "", end: "" });
    const [places, setPlaces]: any = useState([]);
    const [subwayStation, setSubwayStation] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [polygonPath, setPolygonPath]: any = useState([]);
    const [overlayCoordinates, setOverlayCoordinates] = useState<any>(null);
    const [polygon, setPolygon] = useState<any>(null);
    const [overlayRegionVisible, setOverlayRegionVisible] = useState(false);
    const [overlayMidpointVisible, setOverlayMidpointVisible] = useState(false);

    // 지도 정보
    const [map, setMap] = useState<any>();

    // 선택한 동네 좌표
    const [coordinates, setCoordinates] = useState({
        // 지도의 초기 위치
        center: { lat: 33.450701, lng: 126.570667 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: false,
    });

    // 선택한 동네 text
    const location = useAtomValue(locationState);

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

            const midpoint = {
                lat: (startLocation.lat + endLocation.lat) / 2,
                lng: (startLocation.lng + endLocation.lng) / 2,
            };

            const nearbyPlaces = await getNearbyPlaces(
                midpoint.lat,
                midpoint.lng
            );

            const nearbySubway = await getNearestSubwayStation(
                midpoint.lat,
                midpoint.lng
            );

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
                    KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_APP_KEY}`,
                },
            }
        );

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
                    KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_APP_KEY}`,
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
                        KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_APP_KEY}`,
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

    useEffect(() => {
        if (!map || location.sido === null) return;
        const ps = new kakao.maps.services.Places();
        const joinLocation = [location.sido, location.sigugun, location.dong]
            .filter(Boolean)
            .join("");
        ps.keywordSearch(joinLocation, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds();
                let markers = [];

                for (var i = 0; i < data.length; i++) {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                    });
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);

                setOverlayMidpointVisible(false);
                setOverlayRegionVisible(true);
                setOverlayCoordinates(markers[0].position);
            }
        });

        if (location !== null && location !== undefined) {
            // * polygon api 넣을 곳
            // setPolygonPath(() => {
            //     return _.find(polygon, {properties : {EMD_KOR_NM : ''}});
            // });
        }
        if (location.code !== null) {
            API_RESION_POLYGON(location.code).then((res) => {
                setPolygon((prev: any) => {
                    return _.map(
                        res?.data?.response?.result?.featureCollection
                            ?.features[0]?.geometry?.coordinates[0][0],
                        (item) => {
                            return { lng: item[0], lat: item[1] };
                        }
                    );
                });
            });
        }
    }, [map, location]);

    useEffect(() => {
        if (!map) return;
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(
            midPointPlace?.address_name,
            (data: any, status, _pagination): any => {
                if (status === kakao.maps.services.Status.OK) {
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    const bounds = new kakao.maps.LatLngBounds();
                    let markers = [];

                    for (var i = 0; i < data.length; i++) {
                        // @ts-ignore
                        markers.push({
                            position: {
                                lat: data[i].y,
                                lng: data[i].x,
                            },
                            content: data[i].place_name,
                        });
                        // @ts-ignore
                        bounds.extend(
                            new kakao.maps.LatLng(data[i].y, data[i].x)
                        );
                    }

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                    setOverlayRegionVisible(false);
                    setOverlayMidpointVisible(true);
                    setOverlayCoordinates(markers[0].position);
                }
            }
        );
    }, [midPointPlace]);

    return (
        <div className='w-full relative'>
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
                src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false&libraries=services`} // autoload 파라메터는 false로 지정
                onLoad={() => {
                    kakao.maps.load(() => {
                        setLoaded(true);
                    });
                }} // 동적으로 로드
            />

            <div className=''>
                {loaded && (
                    <Maps
                        coordinates={coordinates}
                        midPoint={midPointPlace}
                        places={places}
                        subwayStation={subwayStation}
                        setMap={setMap}
                        polygonPath={polygonPath}
                        overlayRegionVisible={overlayRegionVisible}
                        setOverlayRegionVisible={setOverlayRegionVisible}
                        overlayMidpointVisible={overlayMidpointVisible}
                        setOverlayMidpointVisible={setOverlayMidpointVisible}
                        overlayCoordinates={overlayCoordinates}
                        polygon={polygon}
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

export default KakaoMapLayout;
