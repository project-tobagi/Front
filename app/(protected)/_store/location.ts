import { atom } from "jotai";

export const locationState = atom({
    sido: null,
    sigugun: null,
    dong: null,
});

export const midPointState = atom(null);
export const midPointPlaceState = atom(null);

export const addressState = atom(null);

export const relatedSearchListState = atom([]);
