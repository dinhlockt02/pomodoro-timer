import * as React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Button({children, onClick}: ButtonProps) {
    return (
        <button className="font-lobster bg-primary min-w-12 text-white px-8 py-2 rounded-full text-xl hover:bg-red-500 hover:text-gray-100 hover:shadow"
        onClick={onClick}>{children}</button>
    )
}