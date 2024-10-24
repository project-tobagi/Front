"use client";

// * install libraries
import { useAtomValue } from "jotai";
import { toast } from "react-toastify";

// * state
import { addressState } from "@/app/(protected)/_store/location";

// * components
import Descriptions from "../Descriptions";
import Icon from "../../common/Icon";

// * etc
import { saveClipboardText } from "@/app/(protected)/_utils/clipboard";

const ResultLayout = ({ stepFlow }: any) => {
    const address = useAtomValue<any>(addressState);

    return (
        <div className='lg:h-full max-lg:h-[calc(100%-250px)]  flex flex-col'>
            <Descriptions
                title='가장 빠르게 갈 수 있는 중간 지점을 찾았어요!'
                subTitle=''
            />

            <div className='flex flex-col justify-between h-full max-lg:px-6'>
                <div className='ring-1 ring-[#00A2FF] p-4 mt-6  rounded-lg min-h-[100px]'>
                    <div>
                        <ul className='grid gap-2'>
                            <li className='flex items-center gap-2 truncate pl-0.5 text-xs'>
                                <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md '>
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
                                <h1 className='px-1 h-4 flex items-center ring-1  ring-black rounded-md '>
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
                                <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md '>
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

                <div className='lg:hidden text-lg max-sm:text-sm text-center'>
                    중간 지점 근처에 대해서 알아보고 싶다면 하단의 더 ‘주변
                    탐색’을 클릭해 보세요.
                </div>

                <div className='w-full flex justify-between'>
                    <button
                        className='max-lg:hidden ring-1 rounded-full ring-gray-300 px-4 py-1'
                        onClick={() => {
                            stepFlow.back();
                        }}
                    >
                        뒤로
                    </button>

                    <button
                        className='rounded-full max-lg:fixed max-lg:mx-4 max-lg:left-0 max-lg:right-0 max-lg:rounded-xl  px-4 py-1 max-lg:py-2 bg-black text-white'
                        onClick={() => {
                            stepFlow.next();
                        }}
                    >
                        주변 탐색하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultLayout;
