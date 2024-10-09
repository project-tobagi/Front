"use client";

// * install libraries
import { useAtomValue } from "jotai";

// * state
import { overlayVisibleState } from "../../_store/visible";

const MenuOverlay = ({ contents }: any) => {
    const overlayVisible = useAtomValue(overlayVisibleState);

    return (
        <div
            className={[
                "absolute lg:left-0 lg:top-0 max-lg:right-0 max-lg:bottom-0  z-50",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div
                className={[
                    overlayVisible
                        ? "bg-white p-6 rounded-lg shadow-[0px_4px_4px_0px_#00000040] max-lg:h-screen max-lg:w-screen m-auto"
                        : "w-48",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {contents}
            </div>
        </div>
    );
};

export default MenuOverlay;
