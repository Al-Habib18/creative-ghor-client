/** @format */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export default function ProductCard({ id, name, price, image }: Product) {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const handleNavigate = () => {
        router.push(`/products/${id}`);
    };

    return (
        <div
            onClick={handleNavigate}
            className={`cursor-pointer rounded-2xl shadow-md hover:shadow-xl p-4 flex flex-col justify-between transition-colors duration-300 ${
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
        >
            <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
            />
            <div className="mt-3 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p
                    className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    ${price.toFixed(2)}
                </p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    Show Details
                </button>
            </div>
        </div>
    );
}
