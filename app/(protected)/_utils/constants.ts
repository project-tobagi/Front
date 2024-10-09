export const ENV = process.env.APP_ENV;

export const MENU_TYPES = [
    {
        type: "menu_1",
        icon: "ic_menu",
        activeIcon: "ic_menu_on",
    },
    {
        type: "menu_2",
        icon: "ic_menu_2",
        activeIcon: "ic_menu_2_on",
    },
    // {
    //     type: "menu_3",
    //     icon: "ic_menu",
    //     activeIcon: "ic_menu_on",
    // },
];

export const CATEGORY_GROUP_CODES = [
    {
        code: "FD6",
        type: "음식점",
        icon: "🍽️",
    },
    {
        code: "CE7",
        type: "카페",
        icon: "☕",
    },
    {
        code: "CS2",
        type: "편의점",
        icon: "🏪",
    },

    {
        code: "HP8",
        type: "병원",
        icon: "🏥",
    },
    {
        code: "MT1",
        type: "대형마트",
        icon: "🛒",
    },

    {
        code: "PM9",
        type: "약국",
        icon: "💊",
    },
    {
        code: "SW8",
        type: "지하철역",
        icon: "🚇",
    },
    {
        code: "SC4",
        type: "학교",
        icon: "🏫",
    },
    {
        code: "CT1",
        type: "문화시설",
        icon: "🎡",
    },
    {
        code: "AC5",
        type: "학원",
        icon: "🤓",
    },
    {
        code: "OL7",
        type: "주유소, 충전소",
        icon: "⛽",
    },
    {
        code: "BK9",
        type: "은행",
        icon: "🏦",
    },
    {
        code: "PK6",
        type: "주차장",
        icon: "🅿️",
    },
    {
        code: "AG2",
        type: "부동산",
        icon: "🏠",
    },
    {
        code: "AT4",
        type: "관광명소",
        icon: "🧳",
    },
    {
        code: "PO3",
        type: "공공기관",
        icon: "🏢",
    },
    {
        code: "PS3",
        type: "어린이집, 유치원",
        icon: "🐥",
    },
    {
        code: "AD5",
        type: "숙박",
        icon: "🏨",
    },
];

export const CONDITION_TYPES = [
    {
        id: 1,
        label: "편의시설",
        value: 1,
        active: false,
        type: "mart",
        code: "martRank",
    },
    {
        id: 2,
        label: "치안",
        value: 1,
        active: false,
        type: "security",
        code: "securityRank",
    },
    {
        id: 3,
        label: "문화시설",
        value: 1,
        active: false,
        type: "culture",
        code: "cultureRank",
    },
    {
        id: 4,
        label: "맛집",
        value: 1,
        active: false,
        type: "restaurant",
        code: "restaurantRank",
    },
    {
        id: 5,
        label: "교통",
        value: 1,
        active: false,
        type: "station",
        code: "stationRank",
    },
    {
        id: 6,
        label: "생활 인프라",
        value: 1,
        active: false,
        type: "infra",
        code: "infraRank",
    },
];
