"use client";

// * basic
import { useEffect } from "react";

// * install libraries
import axios from "axios";

const Protected = ({ children }: any) => {
    // 동읍리 api 요청 예제
    // useEffect(() => {
    //     axios.get(
    //         `https://cors-anywhere.herokuapp.com/https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=${process.env.DATA_API_KEY}&domain=http://localhost:3000&attrFilter=emd_cd:like:11110101&crs=EPSG:4326`
    //     );
    // }, []);
    return <div className='overflow-hidden'>{children}</div>;
};

export default Protected;
