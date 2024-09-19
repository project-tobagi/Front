import axios from "../_utils/axios";

// // * Polygon API
// export const API_RESION_POLYGON = (code: any) => {
//     const res = axios.get(`/api/externalApi?path=region?dongCode=${code}`);

//     console.log(res);
//     return res;
// };

// // * 교통정보
// export const API_STATION_STATUS = (code: number, rank: number) => {
//     const res = axios.get(
//         `/api/externalApi?path=station?donGrpCd=${code}&rank=${rank}`
//     );

//     console.log(res);
//     return res;
// };

// * Polygon API
export const API_RESION_POLYGON = async (code: any) => {
    const res = await axios.get(`/region?dongCode=${code}`);

    return res;
};

// * 교통정보
export const API_STATION_STATUS = async (code: number, rank: number) => {
    const res = await axios.get(`/station?donGrpCd=${code}&rank=${rank}`);

    return res;
};
