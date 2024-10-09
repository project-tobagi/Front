"use client";

// * install libraries
import { useMediaQuery } from "react-responsive";

const Descriptions = ({
    title,
    subTitle,
}: {
    title: string;
    subTitle: string;
}) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    if (isDesktopOrLaptop) {
        return (
            <div className='text-center grid gap-2'>
                <h1 className='text-lg font-semibold'>{title}</h1>
                <p className='text-xs  text-[#808185] font-light whitespace-pre-wrap'>
                    {subTitle}
                </p>
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className='text-start grid gap-2 px-5 pt-5'>
                <h1 className='max-sm:text-base text-xl  font-semibold'>
                    {title}
                </h1>
                <p className='max-sm:text-sm text-base text-gray-400 mt-1'>
                    {subTitle}
                </p>
            </div>
        );
    }
};

export default Descriptions;
