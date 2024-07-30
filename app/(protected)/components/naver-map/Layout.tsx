"use client";

import React, { useEffect, useState, useCallback } from "react";

import {
    Container as MapDiv,
    NaverMap,
    Marker,
    useNavermaps,
} from "react-naver-maps";

const NaverMapLayout = () => {
    return (
        <MapDiv className='relative w-full h-[600px]'>
            {() => {
                const navermaps = useNavermaps();

                const [zoom, setZoom] = useState(13);

                const [draggable, setDraggable] = useState(true);
                const [disableKineticPan, setDisableKineticPan] =
                    useState(true);
                const [tileTransition, setTileTransition] = useState(true);
                const [minZoom, setMinZoom] = useState(7);
                const [scaleControl, setScaleControl] = useState(true);

                const handleZoomChanged = useCallback((zoom) => {
                    console.log(`zoom: ${zoom}`);
                }, []);

                const normalBtnStyle =
                    "bg-white border border-solid border-gray-800 outline-none rounded shadow-md mr-2 mb-2";
                const selectedBtnStyle = `${normalBtnStyle} bg-blue-600 text-white`;

                return (
                    <>
                        <div className='absolute top-0 left-0 z-10 p-2'>
                            <button
                                className={
                                    draggable
                                        ? selectedBtnStyle
                                        : normalBtnStyle
                                }
                                onClick={() => {
                                    setDraggable((prev) => !prev);
                                }}
                            >
                                지도 인터렉션
                            </button>
                            <button
                                className={
                                    !disableKineticPan
                                        ? selectedBtnStyle
                                        : normalBtnStyle
                                }
                                onClick={() => {
                                    setDisableKineticPan((prev) => !prev);
                                }}
                            >
                                관성 드래깅
                            </button>
                            <button
                                className={
                                    tileTransition
                                        ? selectedBtnStyle
                                        : normalBtnStyle
                                }
                                onClick={() => {
                                    setTileTransition((prev) => !prev);
                                }}
                            >
                                타일 fadeIn 효과
                            </button>
                            <button
                                className={
                                    scaleControl
                                        ? selectedBtnStyle
                                        : normalBtnStyle
                                }
                                onClick={() => {
                                    setScaleControl((prev) => !prev);
                                }}
                            >
                                모든 지도 컨트롤
                            </button>
                            <button
                                className={normalBtnStyle}
                                onClick={() => {
                                    setMinZoom((prev) =>
                                        prev === 10 ? 7 : 10
                                    );
                                }}
                            >
                                최소/최대 줌 레벨: {minZoom} ~ 21
                            </button>
                        </div>
                        <NaverMap
                            zoomControl
                            zoomControlOptions={{
                                position: navermaps.Position.TOP_RIGHT,
                            }}
                            defaultCenter={
                                new navermaps.LatLng(37.3595704, 127.105399)
                            }
                            defaultZoom={13}
                            onZoomChanged={handleZoomChanged}
                            // 지도 인터랙션 옵션
                            draggable={draggable}
                            pinchZoom={draggable}
                            scrollWheel={draggable}
                            keyboardShortcuts={draggable}
                            disableDoubleTapZoom={!draggable}
                            disableDoubleClickZoom={!draggable}
                            disableTwoFingerTapZoom={!draggable}
                            // 관성 드래깅 옵션
                            disableKineticPan={disableKineticPan}
                            // 타일 fadeIn 효과
                            tileTransition={tileTransition}
                            // min/max 줌 레벨
                            minZoom={minZoom}
                            maxZoom={21}
                            // 지도 컨트롤
                            scaleControl={scaleControl}
                            logoControl={scaleControl}
                            mapDataControl={scaleControl}
                            mapTypeControl={scaleControl}
                            // zoomControl={scaleControl}
                        />
                    </>
                );
            }}
        </MapDiv>
    );
};

export default NaverMapLayout;
