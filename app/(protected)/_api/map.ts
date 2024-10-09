// * install libraries
import axios from "axios";

// * etc
import { generateAddress } from "../_utils/address";

// 주소 -> 좌표
export const getCoordinates = async (address: any, toast: any) => {
    const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json`,
        {
            params: { query: address },
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                // KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_REST_API_KEY}`,
            },
        }
    );

    if (response.data.documents.length === 0) {
        toast.warn("선택한 출발지와 도착지가 올바르지 않습니다.", {
            position: "top-right",
        });
    }

    const { x, y, road_address } = response.data.documents[0].address;

    return {
        lat: parseFloat(y),
        lng: parseFloat(x),
        address: road_address,
    };
};

// 좌표 -> 주소
export const getAddress = async (
    coordinates: any,
    toast: any,
    setState: any
) => {
    const response = await axios.get(
        "https://dapi.kakao.com/v2/local/geo/coord2address.json",
        {
            params: {
                x: coordinates.lng,
                y: coordinates.lat,
                // input_coord: "WGS84",
            },
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
        }
    );
    if (response.data.documents.length === 0) {
        return toast.warn("선택한 출발지와 도착지가 올바르지 않습니다.", {
            position: "top-right",
        });
    }

    if (setState !== null) {
        setState(generateAddress(response.data.documents[0]));
    }

    return generateAddress(response.data.documents[0]);
};

// 중간지점 근처 장소 (카테고리)
export const getNearestPlace = async (
    lat: number,
    lng: number,
    toast: any,
    selectedCategory: any
) => {
    try {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/category.json`,
            {
                params: {
                    category_group_code: selectedCategory, // 지하철역
                    x: lng,
                    y: lat,
                    radius: 10000, // 검색 반경 (미터 단위)
                    sort: "distance", // 거리 기준 정렬
                },
                headers: {
                    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                    // KA: `sdk/1.0 os/javascript lang/ko device/desktop origin/${process.env.KAKAO_REST_API_KEY}`,
                },
            }
        );

        if (response.data.documents.length > 0) {
            // 가장 가까운 지하철역 정보 반환
            return response.data.documents;
        } else {
            toast.error("해당 두 장소사이에 중간지점이 존재하지 않습니다.", {
                position: "top-right",
            });
        }
    } catch (error) {
        // toast.warn(
        //     <div className='text-xs'>
        //         해당 두 장소사이에 중간지점이 존재하지 않습니다.
        //     </div>,
        //     {
        //         position: "top-right",
        //     }
        // );
    }
};
