"use client";

const MenuOverlay = ({ contents }: any) => {
    return (
        <div className='absolute left-0 top-0 z-50'>
            <div className='bg-white p-20 rounded-lg shadow-[0px_4px_4px_0px_#00000040] '>
                {contents}
            </div>
        </div>
    );
};

export default MenuOverlay;
