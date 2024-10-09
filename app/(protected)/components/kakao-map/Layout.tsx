"use client";

// * basic
import { useEffect, useState } from "react";
import Script from "next/script";

// * install libraries
import { useUpdateEffect } from "react-use";
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-toastify";

// * state
import {
    locationState,
    midPointPlaceState,
    midPointState,
} from "../../_store/location";

// * components
import Maps from "./Maps";

// * etc
import { getCoordinates } from "../../_api/map";
import { polygonState } from "../../_store/region";
import { menuState } from "../../_store/menu";

/**
 * @param location '', 선택한 동네 (ex:대구광역시 북구 태전동)
 * @param coordinates {center:{lat:0,lng:0}, isPanto: false}, 선택한 동네 좌표
 * @returns
 */

const KakaoMapLayout = () => {
    const midPointPlace = useAtomValue<any>(midPointPlaceState);

    const menus = useAtomValue(menuState);

    const [loaded, setLoaded] = useState(false);
    const [polygon, setPolygon]: any = useAtom(polygonState);
    const [overlayCoordinates, setOverlayCoordinates] = useState<any>(null);
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

    useEffect(() => {
        if (!map || location.sido === null) return;
        const joinLocation = [location.sido, location.sigugun, location.dong]
            .filter(Boolean)
            .join(" ");
        try {
            getCoordinates(joinLocation, toast).then((res) => {
                if (res !== null && res !== undefined) {
                    const bounds = new kakao.maps.LatLngBounds();
                    bounds.extend(new kakao.maps.LatLng(res.lat, res.lng));
                    map.setBounds(bounds);
                    map.setLevel(7);

                    setOverlayMidpointVisible(false);
                    setOverlayRegionVisible(true);
                    setOverlayCoordinates({ lng: res.lng, lat: res.lat });
                }
            });
        } catch (err) {
            toast.error("선택한 동네의 좌표를 찾지 못했습니다.", {
                position: "top-right",
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

    useUpdateEffect(() => {
        setOverlayCoordinates(null);
        setOverlayRegionVisible(false);
        setOverlayMidpointVisible(false);
    }, [menus]);

    return (
        <div className='w-full relative'>
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
                        setMap={setMap}
                        overlayRegionVisible={overlayRegionVisible}
                        setOverlayRegionVisible={setOverlayRegionVisible}
                        overlayMidpointVisible={overlayMidpointVisible}
                        setOverlayMidpointVisible={setOverlayMidpointVisible}
                        overlayCoordinates={overlayCoordinates}
                        polygon={polygon}
                    />
                )}
            </div>
        </div>
    );
};

export default KakaoMapLayout;
