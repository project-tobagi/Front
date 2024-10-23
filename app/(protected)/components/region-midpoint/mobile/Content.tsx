"use client";

import { ColorRing } from "react-loader-spinner";
// * components
import MidpointLayout from "../midpoint/Layout";
import PlaceLayout from "../place/Layout";

const MobileRegionMidpointContent = ({
    stepFlow,
    placeResult,
    setPlaceResult,
}: any) => {
    return (
        <div className='flex h-[520px] mt-16  max-lg:h-full '>
            <div className='w-[370px] max-lg:w-full h-full relative'>
                {stepFlow.loading && (
                    <div className='absolute size-full flex items-center justify-center z-50'>
                        <ColorRing
                            visible={true}
                            height='100'
                            width='100'
                            ariaLabel='color-ring-loading'
                            wrapperStyle={{}}
                            wrapperClass='color-ring-wrapper'
                            colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                            ]}
                        />
                    </div>
                )}

                <MidpointLayout stepFlow={stepFlow} />
                <PlaceLayout
                    stepFlow={stepFlow}
                    placeResult={placeResult}
                    setPlaceResult={setPlaceResult}
                />
            </div>
        </div>
    );
};

export default MobileRegionMidpointContent;
