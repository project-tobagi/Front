"use client";

// * basic
import { useState, useEffect } from "react";

// * install libraries
import { ToastContainer } from "react-toastify";

// * components
import Header from "./Header";
import Left from "./Left";
import Bottom from "./Bottom";
import Contents from "./Contents";
import DivideGroup from "../common/divides/DivideGroup";
import DividePanel from "../common/divides/DividePanel";

const Layout = ({ children }: any) => {
    const [innerHeight, setInnerHeight] = useState<string | number>("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setInnerHeight(window.innerHeight);
        }
    }, []);

    return (
        <div
            className='container-none'
            style={{ height: innerHeight ? `${innerHeight}px` : "100vh" }}
        >
            <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
            <Header />

            <div className='p-4 max-lg:p-0'>
                <DivideGroup>
                    <DividePanel>
                        <Left />
                        <Bottom />
                    </DividePanel>

                    <DividePanel className='w-full'>
                        <Contents>{children}</Contents>
                    </DividePanel>
                </DivideGroup>
            </div>
        </div>
    );
};

export default Layout;
