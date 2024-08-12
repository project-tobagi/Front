"use client";

// * install libraries
import { cn } from "@/lib/utils";

const DividePanel = ({
    size,
    children,
    className,
}: {
    size?: any;
    children: any;
    className?: string;
}) => {
    const inlineStyle = size ? { flexBasis: `${size}%` } : {};

    return (
        <div style={inlineStyle} className={className}>
            {children}
        </div>
    );
};

export default DividePanel;
