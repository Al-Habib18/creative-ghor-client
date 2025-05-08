/** @format */

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import renderStars from "./renderStars";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const originalPrice =
        product.price + (product.price * (product.discount || 0)) / 100;

    return (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 text-black dark:text-white dark:border-1 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                    src={product.image || "/placeholder.jpeg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-200 hover:scale-105"
                />
            </div>

            <div className="mt-4 space-y-1 flex-grow">
                <h2 className="text-lg font-semibold line-clamp-1">
                    {product.name}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-green-500">
                        ${product.price}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-sm text-red-500 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                        <span className="text-xs text-muted-foreground">
                            ({product.reviewsCount})
                        </span>
                    </div>
                </div>
            </div>

            <Link href={`/products/${product.id}`} passHref>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-xl w-full transition-colors">
                    View Details
                </button>
            </Link>
        </div>
    );
}
