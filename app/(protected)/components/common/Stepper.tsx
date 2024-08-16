"use client";

// * install libraries
import _ from "lodash";
import { Separator } from "@/components/ui/separator";

const Stepper = ({ step, contents, lastStep }: any) => {
    return (
        <ol className='flex  items-center w-full text-xs text-gray-500 font-medium sm:text-xs mb-2'>
            {_.map(contents, (data: any) => {
                if (data.step === lastStep) {
                    return (
                        <li
                            className={[
                                "flex whitespace-nowrap items-center text-[#D1D6DE]",
                                step == data.step
                                    ? "text-black"
                                    : "text-[#D1D6DE]",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div className='flex items-center'>
                                <span
                                    className={[
                                        "w-6 h-6 border rounded-full flex justify-center items-center mr-1 text-xs ",
                                        step == data.step
                                            ? "border-[#00A2FF] text-[#00A2FF]"
                                            : "text-[#D1D6DE]",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {data.step}
                                </span>
                                <p> {data.label}</p>
                            </div>
                        </li>
                    );
                } else {
                    return (
                        <li
                            className={[
                                "flex w-full items-center  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:border-1 after:hidden sm:after:inline-block  xl:after:mx-4",
                                step == data.step
                                    ? "text-black"
                                    : "text-[#D1D6DE]",
                                data.step == 2
                                    ? "after:mr-2.5"
                                    : "after:ml-2.5",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden">
                                <p
                                    className={[
                                        "flex items-center justify-center w-24",
                                    ]
                                        .filter(Boolean)
                                        .join("")}
                                >
                                    <span
                                        className={[
                                            "w-6 h-6 border rounded-full flex justify-center items-center mr-1 text-xs ",
                                            step == data.step
                                                ? "border-[#00A2FF] text-[#00A2FF]"
                                                : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        {data.step}
                                    </span>
                                    {data.label}
                                </p>
                            </div>
                        </li>
                    );
                }
            })}
        </ol>
    );
};

export default Stepper;
