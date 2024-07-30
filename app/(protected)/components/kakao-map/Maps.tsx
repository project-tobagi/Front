"use client";

// * basic
import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

const Maps = (props: any) => {
    const { midpoint, places, subwayStation } = props;
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (midpoint && mapRef.current && window.kakao !== undefined) {
            const { kakao } = window;

            kakao.maps.load();

            if (!kakao || !kakao.maps) {
                console.error("Kakao Maps API is not properly loaded.");
                return;
            }
            // 지도 생성
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(midpoint.lat, midpoint.lng),
                level: 4,
            });

            // 중간 지점 마커 생성
            new kakao.maps.Marker({
                position: new kakao.maps.LatLng(midpoint.lat, midpoint.lng),
                map,
            });

            // 주변 장소 마커 생성
            places.forEach((place: any) => {
                const markerPosition = new kakao.maps.LatLng(place.y, place.x);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    map,
                });

                // 마커 클릭 이벤트 리스너 추가 (장소 이름을 인포윈도우로 표시)
                kakao.maps.event.addListener(marker, "click", () => {
                    const infoWindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;z-index:1;">${place.name}</div>`,
                    });
                    infoWindow.open(map, marker);
                });
            });
        } else {
            console.error(
                "Kakao Maps API is not loaded or midpoint is missing."
            );
        }
    }, [midpoint, places]);

    return (
        <Map // 지도를 표시할 Container
            id='map'
            className='rounded-lg w-full h-[calc(100vh-6rem)]'
            center={{
                // 지도의 중심좌표
                lat: subwayStation !== null ? subwayStation.y : 33.450701,
                lng: subwayStation !== null ? subwayStation.x : 126.570667,
            }}
            level={5} // 지도의 확대 레벨
        />
    );
};

export default Maps;
