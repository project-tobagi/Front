"use client";

// * basic
import { useEffect, useRef } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";

const Maps = (props: any) => {
    const { midpoint, coordinates, places, subwayStation, setMap } = props;
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
            center={coordinates.center}
            isPanto={coordinates.isPanto}
            level={5} // 지도의 확대 레벨
            onCreate={setMap}
        >
            {/* <Polygon
                path={polygonPath}
                strokeWeight={3} // 선의 두께입니다
                strokeColor={"#39DE2A"} // 선의 색깔입니다
                strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
                fillColor={"#A2FF99"} // 채우기 색깔입니다
                fillOpacity={0.7} // 채우기 불투명도입니다
                //   fillColor={isMouseOver ? "#EFFFED" : "#A2FF99"} // 채우기 색깔입니다
                //   fillOpacity={isMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                //   onMouseover={() => setIsMouseOver(true)}
                //   onMouseout={() => setIsMouseOver(false)}
                //   onMousedown={(_polygon, mouseEvent) => {
                //     console.log(mouseEvent)
                //     setDownCount(downCount + 1)
                //   }}
            /> */}
        </Map>
    );
};

export default Maps;
