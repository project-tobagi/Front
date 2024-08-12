import { atom } from "jotai";

export const locationState = atom({
    sido: null,
    sigugun: null,
    dong: null,
});

export const midPointState = atom({
    lat: 0,
    lng: 0,
});
