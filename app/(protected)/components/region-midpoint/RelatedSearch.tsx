"use client";

// * install libraries
import _ from "lodash";
import { useAtom, useAtomValue } from "jotai";

// * state
import { relatedSearchListState } from "../../_store/location";

const RelatedSearch = ({ currentIndex, setStartPoints, setOpen }: any) => {
    const [relatedSearchList, setRelatedSearchList] = useAtom(
        relatedSearchListState
    );
    return (
        <div className='relative w-full  bg-white  h-full '>
            <ul>
                {_.map(relatedSearchList, (point: any) => {
                    return (
                        <li
                            onClick={() => {
                                setStartPoints((prev: any[]) => {
                                    return prev.map((item: any, i: number) => {
                                        if (currentIndex === i) {
                                            setOpen({
                                                visible: false,
                                                index: 0,
                                            });
                                            setRelatedSearchList([]);
                                            return {
                                                ...item,
                                                name:
                                                    point.road_address_name ||
                                                    point.address_name,
                                            };
                                        } else {
                                            return item;
                                        }
                                    });
                                });
                            }}
                            className={[
                                `w-full py-2 px-3 hover:bg-gray-100 text-sm cursor-pointer`,
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div>
                                <h1> {point.place_name}</h1>
                                <p className='text-xs text-gray-400'>
                                    {point.road_address_name ||
                                        point.address_name}
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
