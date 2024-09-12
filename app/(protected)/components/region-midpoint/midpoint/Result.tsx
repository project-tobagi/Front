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
        <div className='h-full flex flex-col'>
            <Descriptions
                title='가장 빠르게 갈 수 있는 중간 지점을 찾았어요!'
                subTitle={`중간 지점 근처에 대해서 알아보고 싶다면\n하단의 더 ‘주변 탐색하기’를 선택해보세요.`}
            />

            <div className='flex flex-col justify-between h-full '>
                <div className='ring-1 ring-[#00A2FF] p-6 mt-6  rounded-lg min-h-[140px]'>
                    <div>
                        <ul className='grid gap-2'>
                            <li className='flex items-center gap-2 truncate pl-0.5'>
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
                            <li className='flex items-center gap-2 truncate pl-0.5'>
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
                            <li className='flex items-center gap-2 pl-0.5'>
                                <h1 className='px-1 h-4 flex items-center ring-1 ring-black rounded-md text-xs'>
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

                <div className='w-full flex justify-between'>
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
