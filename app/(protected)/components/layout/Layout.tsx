"use client";

// * components
import Header from "./Header";
import Left from "./Left";
import Contents from "./Contents";
import DivideGroup from "../divides/DivideGroup";
import DividePanel from "../divides/DividePanel";

const Layout = ({ children }: any) => {
    return (
        <div className='h-screen'>
            <Header />

            <div className='h-[calc(100%-44px)] p-4'>
                <DivideGroup className=''>
                    <DividePanel size={5}>
                        <Left />
                    </DividePanel>

                    <DividePanel size={95}>
                        <Contents>{children}</Contents>
                    </DividePanel>
                </DivideGroup>
            </div>
        </div>
    );
};

export default Layout;
