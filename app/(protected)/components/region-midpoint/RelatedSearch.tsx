"use client";

// * install libraries
import _ from "lodash";
import { useAtomValue } from "jotai";

// * state
import { relatedSearchListState } from "../../_store/location";

const RelatedSearch = () => {
    const relatedSearchList = useAtomValue(relatedSearchListState);
    return (
        <div className='relative w-[200px] h-50 bg-white px-4 h-full overflow-y-auto'>
            <h1 className='px-3 pb-3 font-bold'>연관 검색어</h1>

            <ul>
                {_.map(relatedSearchList, (item: any) => {
                    return (
                        <li
                            className={[
                                `py-2 px-3 hover:bg-gray-100 text-sm cursor-pointer rounded-lg`,
                                // data.gu === selectedSigugun?.gu &&
                                //     "bg-gray-100 flex justify-between items-center",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div>
                                <h1> {item.place_name}</h1>
                                <p className='text-xs text-gray-400'>
                                    {item.road_address_name ||
                                        item.address_name}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RelatedSearch;
