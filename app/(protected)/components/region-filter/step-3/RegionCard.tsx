"use client";

// * install libraries
import _ from "lodash";

// * components
import Icon from "../../common/Icon";
import { Badge } from "@/components/ui/badge";

const RegionCard = ({
    item,
    index,
    selectedSido,
    selectedSigugun,
    handleClickDetailRegion,
}: any) => {
    return (
        <div
            onClick={() => {
                handleClickDetailRegion(item);
            }}
            className=' ring-1 cursor-pointer ring-gray-300 hover:ring-blue-400 rounded-lg py-2 px-2  mt-3 m-1'
        >
            <div className='h-full relative flex gap-2 flex-col justify-between'>
                {/* header */}
                <div className='flex items-center gap-1'>
                    <Badge>{item.label}</Badge>
                    <p className='text-xs text-[#858585]'>
                        {selectedSido.si + "" + selectedSigugun.gu}
                    </p>
                </div>

                {/* contents */}
                <div className=''>
                    <ul className='flex flex-col gap-1 text-xs leading-5'>
                        {_.map(item.value, (data: any) => {
                            return (
                                <li
                                    key={`description-${data.rank}`}
                                    className='flex gap-2'
                                >
                                    <Icon
                                        type={
                                            data.rank === 3
                                                ? "ic_bad"
                                                : data.rank === 2
                                                ? "ic_soso"
                                                : "ic_good"
                                        }
                                    />
                                    <p>
                                        {_.map(data.category, (cate: any) => {
                                            return cate + ", ";
                                        })}
                                    </p>
                                    <p>
                                        지수가
                                        {"'" + data.rankTxt + "'"}
                                        이에요.
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RegionCard;
