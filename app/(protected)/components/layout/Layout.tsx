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
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }, []);
    return (
        <div className='h-full max-lg:h-[calc(var(--var,1vh)*100vh)]'>
            <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
            <Header />

            <div className='p-4 max-lg:p-0 h-full'>
                <DivideGroup>
                    <DividePanel>
                        <Left />
                        <Bottom />
                    </DividePanel>

                    <DividePanel className='w-full h-full'>
                        <Contents>{children}</Contents>
                    </DividePanel>
                </DivideGroup>
            </div>
        </div>
    );
};

export default Layout;
