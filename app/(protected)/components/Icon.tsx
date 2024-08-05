import Image from "next/image";

// * icons
import ic_location from "@/public/icons/ic_location.svg";
import ic_search from "@/public/icons/ic_search.svg";
import ic_check from "@/public/icons/ic_check.svg";

// * logos
import mainLogo from "@/public/logo/main_logo.svg";
import subLogo from "@/public/logo/sub_logo.svg";

const iconMap: any = {
    ic_location,
    ic_search,
    ic_check,
    mainLogo,
    subLogo,
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
