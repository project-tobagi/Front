import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const summaryDataState = atomWithReset<any>(null);
