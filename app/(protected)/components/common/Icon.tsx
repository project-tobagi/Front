import Image from "next/image";

// * icons
import ic_location from "@/public/icons/ic_location.svg";
import ic_location_on from "@/public/icons/ic_location_on.svg";
import ic_search from "@/public/icons/ic_search.svg";
import ic_check from "@/public/icons/ic_check.svg";
import ic_info from "@/public/icons/ic_info.svg";
import ic_kakao from "@/public/icons/ic_kakao.svg";
import ic_naver from "@/public/icons/ic_naver.svg";
import ic_daum from "@/public/icons/ic_daum.svg";
import ic_google from "@/public/icons/ic_google.svg";
import ic_copy_paste from "@/public/icons/ic_copy_paste.svg";
import ic_naver_map from "@/public/icons/ic_naver_map.svg";
import ic_kakao_map from "@/public/icons/ic_kakao_map.svg";
import ic_my_location from "@/public/icons/ic_my_location.svg";
import ic_menu from "@/public/icons/ic_menu.svg";
import ic_menu_on from "@/public/icons/ic_menu_on.svg";
import ic_menu_2 from "@/public/icons/ic_menu_2.svg";
import ic_menu_2_on from "@/public/icons/ic_menu_2_on.svg";
import ic_home from "@/public/icons/ic_home.svg";
import ic_board from "@/public/icons/ic_board.svg";
import ic_arrow from "@/public/icons/ic_arrow.svg";
import ic_good from "@/public/icons/ic_good.svg";
import ic_soso from "@/public/icons/ic_soso.svg";
import ic_bad from "@/public/icons/ic_bad.svg";

// * logos
import mainLogo from "@/public/logo/main_logo.svg";
import subLogo from "@/public/logo/sub_logo.svg";

const iconMap: any = {
    ic_location,
    ic_location_on,
    ic_search,
    ic_check,
    ic_info,
    ic_copy_paste,
    ic_naver_map,
    ic_kakao_map,
    ic_my_location,
    mainLogo,
    subLogo,
    ic_menu,
    ic_menu_on,
    ic_menu_2,
    ic_menu_2_on,
    ic_home,
    ic_board,
    ic_arrow,
    ic_kakao,
    ic_naver,
    ic_daum,
    ic_google,
    ic_good,
    ic_soso,
    ic_bad,
};

const Icon = (props: any) => {
    const { type, w, h, className, isOriginal } = props;

    const currentIcon = iconMap[type];
    return (
        <Image
            alt=''
            className={[
                isOriginal
                    ? ""
                    : `w-${w && h ? w : "5"} h-${w && h ? h : "5"} ${
                          className !== undefined ? className : ""
                      }`,
            ]
                .filter(Boolean)
                .join(" ")}
            // className={classNames(w && h ? `w-${w} h-${h}` : 'w-5 h-5')}

            unoptimized={true}
            src={currentIcon}
            loader={({ src, width, quality }) => {
                return `${src}?w=${width}&q=${quality || 100}`;
            }}
        />
    );
};

export default Icon;
