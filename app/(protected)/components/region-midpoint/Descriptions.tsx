"use client";

const Descriptions = ({
    title,
    subTitle,
}: {
    title: string;
    subTitle: string;
}) => {
    return (
        <div className='text-center grid gap-2'>
            <h1 className='text-lg font-semibold'>{title}</h1>
            <p className='text-xs text-[#808185] font-light whitespace-pre-wrap'>
                {subTitle}
            </p>
        </div>
    );
};

export default Descriptions;