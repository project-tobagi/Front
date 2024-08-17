"use client";

// * basic
import { useState, useRef, useEffect } from "react";

// * install libararies
import _ from "lodash";

// * components
import Icon from "../../common/Icon";
import RegionSelector from "../../region-select/Layout";

const RegionFilterSelector = () => {
    const inputRef: any = useRef(null);
    const dropdownRef: any = useRef(null);

    const [searchContents, setSearchContents] = useState<string | null>(null);
    const [openDropDown, setOpenDropDown] = useState(false);

    const handleFocus = () => {
        setOpenDropDown(true);
    };

    const handleBlur = (event: any) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.relatedTarget)
        ) {
            setOpenDropDown(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setOpenDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className='relative w-96 '>
                <div className='relative w-full'>
                    <Icon
                        className='absolute top-[50%] translate-y-[-50%] left-3'
                        type='ic_search'
                    />

                    <div
                        ref={inputRef}
                        onBlur={handleBlur}
                        onClick={handleFocus}
                        className='w-full rounded-full border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                    >
                        {searchContents !== null ? (
                            <div className='flex items-center gap-2 font-normal'>
                                {_.map(searchContents, (item, index) => {
                                    if (item === ">") {
                                        return (
                                            <span
                                                key={index}
                                                className='text-blue-500 font-bold'
                                            >
                                                {item}
                                            </span>
                                        );
                                    } else {
                                        return <span key={index}>{item}</span>;
                                    }
                                })}
                            </div>
                        ) : (
                            "여기를 클릭하여 관심 지역을 선택하세요."
                        )}
                    </div>

                    <RegionSelector
                        depth={2}
                        open={openDropDown}
                        setOpen={setOpenDropDown}
                        selectorRef={dropdownRef}
                        setSearchContents={setSearchContents}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegionFilterSelector;
