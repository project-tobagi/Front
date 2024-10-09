import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const regionDataState = atomWithReset<any>(null);

export const polygonState = atomWithReset<any>(null);

export const filteredRegionListState = atomWithReset<any>(null);
