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
import { API_RESION_POLYGON, API_RANK_INFO } from "./_api";

const Protected = ({ children }: any) => {
    const [, setRegionData] = useAtom(regionDataState);
    // 동읍리 api 요청 예제
    // useEffect(() => {
    //     axios.get(
    //         `https://cors-anywhere.herokuapp.com/https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=${process.env.DATA_API_KEY}&domain=http://localhost:3000&attrFilter=emd_cd:like:11110101&crs=EPSG:4326`
    //     );
    // }, []);

    useEffect(() => {
        // 법정동 정보 초기 로드
        // console.log(API_RANK_INFO());
        generateAreaData(setRegionData);

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }, []);

    return (
        <div className='container-none overflow-hidden h-full max-lg:h-[calc(var(--var,1vh)*100vh)]'>
            {children}
        </div>
    );
};

export default Protected;
