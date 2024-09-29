import { atomWithReset } from "jotai/utils";

export const menuState = atomWithReset<any>([
    {
        id: 0,
        label: "홈",
        icon: "ic_home",
        activeIcon: "ic_home",
        active: true,
        disable: false,
    },
    {
        id: 1,
        label: "동네찾기",
        icon: "ic_menu",
        activeIcon: "ic_menu_on",
        active: false,
        disable: false,
    },
    {
        id: 2,
        label: "중간지점",
        icon: "ic_menu_2",
        activeIcon: "ic_menu_2_on",
        active: false,
        disable: false,
    },
    {
        id: 3,
        label: "게시판",
        icon: "ic_board",
        activeIcon: "ic_board",
        active: false,
        disable: true,
    },
]);
