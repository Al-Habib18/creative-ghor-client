/** @format */
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/state/redux";
import { addToCart } from "@/state/cartSlice";
import { useTheme } from "next-themes";
import CheckoutButton from "@/components/CheckoutButton";

// Mock product data (replace with actual API data or Redux state)
const mockProducts = [
    {
        id: "1",
        name: "T-shirt",
        price: 19.99,
        image: "/images/shirt.jpg",
        description: "Comfortable cotton t-shirt for everyday wear.",
    },
    {
        id: "2",
        name: "Shoes",
        price: 59.99,
        image: "/images/shoes.jpg",
        description: "Durable running shoes with great grip.",
    },
    {
        id: "3",
        name: "Headphones",
        price: 99.99,
        image: "/images/headphones.jpg",
        description:
            "High-quality wireless headphones with noise cancellation.",
    },
];

export default function ProductDetailsPage() {
    const { id } = useParams(); // Get the product id from the URL
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const dispatch = useAppDispatch();

    const product = mockProducts.find((p) => p.id === id);

    if (!product)
        return <p className="text-center mt-10 text-lg">Product not found</p>;

    const isDark = resolvedTheme === "dark";

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            })
        );
    };

    return (
        <div
            className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
        >
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6 md:flex md:space-x-8">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="rounded-xl object-cover w-full max-w-md"
                    />
                </div>

                {/* Product Information */}
                <div className="mt-6 md:mt-0 md:flex-1">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mt-2">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                        {product.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                                isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            Add to Cart
                        </button>

                        {/* Shop Now Button */}
                        <CheckoutButton
                            name="Shop Now"
                            redirectUrl="/checkout"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
