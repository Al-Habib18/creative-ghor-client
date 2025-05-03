/** @format */

import Image from "next/image";
import { useAppDispatch } from "@/state/redux";
import { addToCart } from "@/state/cartSlice";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export default function ProductCard({ id, name, price, image }: Product) {
    const dispatch = useAppDispatch();

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4">
            <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
            />
            <div className="mt-3">
                <h2 className="text-lg font-semibold text-black">{name}</h2>
                <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
                <button
                    className="mt-3 bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800"
                    onClick={() =>
                        dispatch(
                            addToCart({ id, name, price, image, quantity: 1 })
                        )
                    }
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
