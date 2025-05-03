/** @format */
"use client";

import ProductCard from "@/components/ProductCard";

const products = [
    { id: "1", name: "T-shirt", price: 19.99, image: "/images/shirt.jpg" },
    { id: "2", name: "Shoes", price: 59.99, image: "/images/shoes.jpg" },
    {
        id: "3",
        name: "Headphones",
        price: 99.99,
        image: "/images/headphones.jpg",
    },
    // Add more as needed
];

export default function ProductsPage() {
    return (
        <div className="py-8 min-h-screen ">
            <div className="container mx-auto max-w-7xl">
                {" "}
                <h1 className="text-2xl font-bold mb-6">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
