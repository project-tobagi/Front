"use client";

// * basic
import { useState, useRef, useEffect } from "react";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../common/Icon";
import RegionSelector from "../region-select/Layout";
import LoginDialog from "../login/Layout";

const Header = () => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [searchContents, setSearchContents] = useState<any>(null);

    const inputRef: any = useRef(null);
    const dropdownRef: any = useRef(null);

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
        <div
            className={[
                "h-16 pt-4 px-4  max-lg:absolute lg:top-4 z-50 max-lg:w-full",
                openDropDown && "max-lg:p-0",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className='flex justify-between max-lg:justify-center items-center max-lg:w-full'>
                {/* logo */}
                <div className='flex gap-2 h-full max-lg:hidden'>
                    <Icon type='mainLogo' isOriginal />
                    <Icon type='subLogo' isOriginal />
                </div>

                {/* input */}
                <div className='max-lg:w-full lg:w-96'>
                    <div className='relative w-full'>
                        <div className='relative w-full'>
                            <Icon
                                className='absolute top-[50%] translate-y-[-50%] left-3'
                                type='ic_search'
                            />

                            <div
                                ref={inputRef}
                                onBlur={handleBlur}
                                onClick={handleFocus}
                                className='w-full rounded-full  bg-white border-none shadow-[0px_4px_4px_0px_#00000040] ring-1 ring-gray-100 pl-12 py-2 font-light text-sm'
                            >
                                {searchContents !== null ? (
                                    <div className='flex items-center gap-2 font-normal'>
                                        {_.map(
                                            searchContents,
                                            (item, index) => {
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
                                                    return (
                                                        <span key={index}>
                                                            {item}
                                                        </span>
                                                    );
                                                }
                                            }
                                        )}
                                    </div>
                                ) : (
                                    "여기를 클릭하여 궁금한 동네를 찾아보세요"
                                )}
                            </div>

                            <RegionSelector
                                open={openDropDown}
                                setOpen={setOpenDropDown}
                                selectorRef={dropdownRef}
                                setSearchContents={setSearchContents}
                            />
                        </div>
                    </div>
                </div>

                {/* profile/notification */}
                <div className='flex gap-3 max-lg:hidden'>
                    <div className='w-10 h-10 rounded-full ring-1 ring-gray-400'></div>
                    <button
                        onClick={() => {
                            setOpenLogin(true);
                        }}
                        className='w-10 h-10 rounded-full ring-1 ring-gray-400'
                    >
                        <h1 className='text-xs flex items-center justify-center h-full'>
                            로그인
                        </h1>
                    </button>
                </div>

                <LoginDialog visible={openLogin} setVisible={setOpenLogin} />
            </div>
        </div>
    );
};

export default Header;
