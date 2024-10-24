"use client";

// * install libraries
import { useAtomValue } from "jotai";
import _ from "lodash";
import { toast } from "react-toastify";

// * state
import { addressState } from "@/app/(protected)/_store/location";

// * components
import Descriptions from "../Descriptions";
import Icon from "../../common/Icon";
import { CATEGORY_GROUP_CODES } from "@/app/(protected)/_utils/constants";

// * etc
import { saveClipboardText } from "@/app/(protected)/_utils/clipboard";

const Category = ({
    stepFlow,
    selectedCategory,
    setSelectedCategory,
    handleClickFindMidpointPlace,
}: any) => {
    const address: any = useAtomValue(addressState);

    const handleClickSelectCategory = (ct: any) => {
        setSelectedCategory((prev: any) => {
            if (_.find(prev, (item) => item.code === ct.code)) {
                return _.filter(prev, (item) => item.code !== ct.code);
            } else {
                return [...prev, ct];
            }
        });
    };

    return (
        <div className='h-full flex flex-col'>
            <Descriptions
                title='중간 지점 근처 탐색을 시작해요.'
                subTitle={`중간 지점 근처에서 탐색해보고픈\n카테고리를 선택해주세요.`}
            />

            <div className='flex flex-col max-lg:h-[calc(100%-300px)]  justify-between max-lg:px-6 lg:h-full'>
                <div className='max-lg:hidden  ring-1 ring-[#00A2FF] p-4 mt-6  rounded-lg min-h-[100px] '>
                    <div>
                        <ul className='grid gap-2'>
                            <li className='flex items-center gap-2 truncate pl-0.5 text-xs'>
                                <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs'>
                                    도로명
                                </h1>
                                <p title={address?.road_address_name}>
                                    {address?.road_address_name}
                                </p>
                                <button
                                    onClick={() => {
                                        saveClipboardText(
                                            address?.road_address_name,
                                            "도로명",
                                            toast
                                        );
                                    }}
                                >
                                    <Icon type='ic_copy_paste' />
                                </button>
                            </li>
                            <li className='flex items-center gap-2 truncate pl-0.5 text-xs'>
                                <h1 className='px-1 h-4 flex items-center ring-1  ring-black rounded-md text-xs'>
                                    지번
                                </h1>
                                <p
                                    className='truncate'
                                    title={address?.address_name}
                                >
                                    {address?.address_name}
                                </p>
                                <button
                                    onClick={() => {
                                        saveClipboardText(
                                            address?.address_name,
                                            "지번",
                                            toast
                                        );
                                    }}
                                >
                                    <Icon type='ic_copy_paste' />
                                </button>
                            </li>
                            <li className='flex items-center gap-2 pl-0.5 text-xs'>
                                <h1 className='px-1 h-4 flex items-center  ring-1 ring-black rounded-md text-xs'>
                                    우편번호
                                </h1>
                                <p>{address?.zone_no}</p>
                                <button
                                    onClick={() => {
                                        saveClipboardText(
                                            address?.zone_no,
                                            "우편번호",
                                            toast
                                        );
                                    }}
                                >
                                    <Icon type='ic_copy_paste' />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='px-8 max-lg:px-2 max-lg:py-6 max-lg:mt-4 overflow-y-auto'>
                    <ul className='flex flex-wrap  justify-center items-center gap-3 p-1 '>
                        {_.map(CATEGORY_GROUP_CODES, (item: any) => {
                            return (
                                <li
                                    key={`category-${item.code}`}
                                    onClick={() => {
                                        handleClickSelectCategory(item);
                                    }}
                                    className={[
                                        "flex gap-2 ring-1 ring-gray-200 justify-center items-center px-2 py-0.5 max-lg:py-1.5 max-lg:px-3 rounded-sm hover:ring-[#00A2FF] cursor-pointer",
                                        _.find(
                                            selectedCategory,
                                            (ct) => ct.code === item.code
                                        ) &&
                                            "bg-[#00A2ff] ring-[#00A2FF] text-white ",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <div className='w-3 h-3 flex justify-between items-center mr-1'>
                                        {item?.icon}
                                    </div>
                                    <p className='inline-block text-sm'>
                                        {item.type}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className='w-full flex justify-between max-lg:hidden'>
                    <button
                        className='ring-1 rounded-full ring-gray-300 px-4 py-1'
                        onClick={() => {
                            stepFlow.back();
                        }}
                    >
                        뒤로
                    </button>

                    <button
                        className='rounded-full px-4 py-1 bg-black text-white'
                        onClick={() => {
                            stepFlow.next();
                            handleClickFindMidpointPlace();
                        }}
                    >
                        다음
                    </button>
                </div>

                {/* selectedCategory가 하나라도 있을때 버튼클릭가능 */}
                <button
                    className='lg:hidden fixed bottom-24 rounded-xl justify-end left-0 right-0 mx-4 py-2 bg-black text-white'
                    onClick={() => {
                        stepFlow.next();
                        handleClickFindMidpointPlace();
                    }}
                >
                    탐색시작
                </button>
            </div>
        </div>
    );
};

export default Category;
