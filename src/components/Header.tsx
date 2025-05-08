/** @format */

import React from "react";
interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
    return (
        <div className="mb-7 flex justify-between items-center">
            <div className="flex w-full flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-white-50">{title}</h1>
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

export default Header;
