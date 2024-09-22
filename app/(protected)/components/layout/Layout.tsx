"use client";

// * install libraries
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";

// * components
import Header from "./Header";
import Left from "./Left";
import Bottom from "./Bottom";
import Contents from "./Contents";
import DivideGroup from "../common/divides/DivideGroup";
import DividePanel from "../common/divides/DividePanel";

const Layout = ({ children }: any) => {
    // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <div className='h-screen'>
            <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
            <Header />

            <div className='h-[calc(100%-44px)] p-4 max-lg:p-0'>
                <DivideGroup className=''>
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
