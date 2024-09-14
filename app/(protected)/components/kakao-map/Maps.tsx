"use client";

// * basic
import { useState, useEffect, useRef } from "react";
import {
    Map,
    Polygon,
    CustomOverlayMap,
    MapMarker,
} from "react-kakao-maps-sdk";

// * components
import RegionOverlay from "./mapOverlay";
import MidPointOverlay from "./MidPointOverlay";

const Maps = (props: any) => {
    const {
        midPoint,
        coordinates,
        places,
        subwayStation,
        setMap,
        polygon,
        polygonPath,
        overlayRegionVisible,
        setOverlayRegionVisible,
        overlayMidpointVisible,
        setOverlayMidpointVisible,
        overlayCoordinates,
    } = props;
    const mapRef = useRef<HTMLDivElement>(null);

    let defaultLevel = 3;
    const [level, setLevel] = useState(defaultLevel);
    console.log(polygon);
    return (
        <Map // 지도를 표시할 Container
            id='map'
            className='rounded-lg w-full h-[calc(100vh-6rem)]'
            center={coordinates.center}
            isPanto={coordinates.isPanto}
            level={level} // 지도의 확대 레벨
            onCreate={setMap}
        >
            <RegionOverlay
                visible={overlayRegionVisible}
                setVisible={setOverlayRegionVisible}
                coordinates={overlayCoordinates}
            />
            <MidPointOverlay
                visible={overlayMidpointVisible}
                setVisible={setOverlayMidpointVisible}
                coordinates={overlayCoordinates}
            />

            <MapMarker // 마커를 생성합니다
                position={{
                    // 마커가 표시될 위치입니다
                    lat: overlayCoordinates?.lat,
                    lng: overlayCoordinates?.lng,
                }}
            />
            {polygon !== null && (
                <Polygon
                    path={polygon}
                    strokeWeight={3} // 선의 두께입니다
                    strokeColor={"#f168b3"} // 선의 색깔입니다
                    strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일입니다
                    fillColor={"#f168b3"} // 채우기 색깔입니다
                    fillOpacity={0.2} // 채우기 불투명도입니다
                    //   fillColor={isMouseOver ? "#EFFFED" : "#A2FF99"} // 채우기 색깔입니다
                    //   fillOpacity={isMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                    //   onMouseover={() => setIsMouseOver(true)}
                    //   onMouseout={() => setIsMouseOver(false)}
                    //   onMousedown={(_polygon, mouseEvent) => {
                    //     console.log(mouseEvent)
                    //     setDownCount(downCount + 1)
                    //   }}
                />
            )}
        </Map>
    );
};

export default Maps;
