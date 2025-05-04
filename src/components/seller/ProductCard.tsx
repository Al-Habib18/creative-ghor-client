/** @format */

// components/seller/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types"; // Adjust the import path if needed

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="rounded-2xl shadow-md hover:shadow-xl p-4 flex flex-col justify-between transition-colors duration-300 bg-white text-black">
            {/* TODO: replace with real image */}
            <Image
                src={/* product.image || */ "/placeholder.jpeg"}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
            />
            <div className="mt-3 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-green-500">
                        ${product.price}
                    </span>
                    {product.discount && (
                        <span className="text-sm text-red-500 line-through">
                            $
                            {product.price +
                                (product.price * product.discount) / 100}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">
                        {product.category}
                    </span>
                    <span className="text-sm text-yellow-500">
                        {product.rating} ({product.reviewsCount} reviews)
                    </span>
                </div>
            </div>
            <Link href={`/dashboard/products/${product.id}`} passHref>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </Link>
        </div>
    );
}
