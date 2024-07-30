"use client";

const DividePanel = ({
    size,
    children,
    className,
}: {
    size: any;
    children: any;
    className?: string;
}) => {
    const inlineStyle = { flexBasis: `${size}%` };

    return (
        <div style={inlineStyle} className={className}>
            {children}
        </div>
    );
};

export default DividePanel;
