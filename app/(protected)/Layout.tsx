"use client";

// * basic
import { useEffect, useState } from "react";

// * install libraries
import axios from "./_utils/axios";
import _ from "lodash";
import { useAtom } from "jotai";

// * state
import { regionDataState } from "./_store/region";

// * etc
import { generateAreaData } from "./_utils/region";
import { API_RESION_POLYGON, API_STATION_STATUS } from "./_api";

const Protected = ({ children }: any) => {
    const [, setRegionData] = useAtom(regionDataState);
    // 동읍리 api 요청 예제
    // useEffect(() => {
    //     axios.get(
    //         `https://cors-anywhere.herokuapp.com/https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=${process.env.DATA_API_KEY}&domain=http://localhost:3000&attrFilter=emd_cd:like:11110101&crs=EPSG:4326`
    //     );
    // }, []);

    useEffect(() => {
        // console.log(API_STATION_STATUS(52111, 3));
        // console.log(API_RESION_POLYGON(1114010500));
    }, []);

    useEffect(() => {
        // 법정동 정보 초기 로드
        generateAreaData(setRegionData);
    }, []);

    return <div className='overflow-hidden'>{children}</div>;
};

export default Protected;
