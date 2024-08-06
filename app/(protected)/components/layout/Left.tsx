"use client";

// * install libaries
import _ from "lodash";

// * components
import Icon from "../Icon";

const Left = () => {
    const sidebarTypes = [
        {
            type: "ic_location",
        },
        {
            type: "ic_location",
        },
        {
            type: "ic_location",
        },
    ];

    return (
        <div className='h-full w-16 border-[1px] border-[#eaeaea] rounded-lg flex justify-center pt-4 mr-4'>
            <div className='flex flex-col gap-4'>
                {_.map(sidebarTypes, (item: any) => {
                    return (
                        <div
                            key={`item-${item.type}`}
                            className='ring-1 ring-[#eaeaea] rounded-full p-2'
                        >
                            <Icon type={item.type} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Left;
