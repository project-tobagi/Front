"use client";

// * basic
import { useState, useEffect, useRef } from "react";
import { Map, Polygon, CustomOverlayMap } from "react-kakao-maps-sdk";

// * components
import AreaOverlay from "./AreaOverlay";

const Maps = (props: any) => {
    const {
        midPoint,
        coordinates,
        places,
        subwayStation,
        setMap,
        polygonPath,
        overlayVisible,
        setOverlayVisible,
        overlayCoordinates,
    } = props;
    const mapRef = useRef<HTMLDivElement>(null);

    let defaultLevel = 3;
    const [level, setLevel] = useState(defaultLevel);

    return (
        <Map // 지도를 표시할 Container
            id='map'
            className='rounded-lg w-full h-[calc(100vh-6rem)]'
            center={coordinates.center}
            isPanto={coordinates.isPanto}
            level={level} // 지도의 확대 레벨
            onCreate={setMap}
        >
            <AreaOverlay
                visible={overlayVisible}
                setVisible={setOverlayVisible}
                coordinates={overlayCoordinates}
            />
            <Polygon
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
            />
        </Map>
    );
};

export default Maps;
