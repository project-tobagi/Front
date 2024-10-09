import { atomWithReset } from "jotai/utils";
import { atom } from "jotai";

export const locationState = atomWithReset({
    sido: null,
    sigugun: null,
    dong: null,
    code: null,
});

export const midPointState = atomWithReset(null);
export const midPointPlaceState = atomWithReset(null);

export const addressState = atomWithReset(null);

export const relatedSearchListState = atomWithReset([]);
