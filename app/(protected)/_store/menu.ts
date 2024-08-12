import { atom } from "jotai";

export const activeMenuState = atom<any>({
    type: "",
    icon: "",
    activeIcon: "",
});
