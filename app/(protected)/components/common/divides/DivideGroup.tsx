"use client";

import { cn } from "@/lib/utils";

const DivideGroup = ({ children, className }: any) => {
    return (
        <div
            className={cn("overflow-hidden flex flex-row relative", className)}
        >
            {children}
        </div>
    );
};

export default DivideGroup;
