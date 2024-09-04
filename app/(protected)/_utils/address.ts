export const generateAddress = (address: any) => {
    return {
        address_name: address.address.address_name,
        road_address_name:
            address?.road_address?.address_name ?? "도로명 주소 없음",
        zone_no: address?.road_address?.zone_no ?? "우편번호 없음",
    };
};
