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

// HTTP 메서드: GET
// 엔드포인트: /rank-info

// GET /v1/rank-info?donGrpCd=123&stationRank=1&restaurantRank=2

// 파라미터 이름	/타입 /필수 여부
// donGrpCd	String	필수
// stationRank	Integer	선택
// restaurantRank	Integer	선택
// cultureRank	Integer	선택
// infraRank	Integer	선택
// securityRank	Integer	선택
// martRank	Integer	선택

// 응답 :

// donCd:  동코드
// category:  카테고리
// rank: 평가
// storeType: 스토어 종류 (
// mart(편의점&백화점) - cvs(편의점), department(백화점)
// security(치안) - security(치안)
// culture(문화시설) - library도서관 , theater영화관
// restaurant(맛집) - restaurant(맛집)
// station(대중교통) - bus(버스), subway(지하철)
// infra(생활인프라) - 병의원(hospital),약국(pharmacy)
// , 공원(park)
// )
// count: 해당 스토어의 수

// ?donGrpCd=11110&facilityRank=1&restaurantRank=1&stationRank=2`
// * 동네찾기 (필터링)
export const API_RANK_INFO = async (param: any) => {
    const res = await axios.get("/rank-info", { params: param });

    return res;
};
