"use client";

import { useGetAllReviewsOfProductQuery } from "@/state/productApi";
import renderStars from "@/components/renderStars";
import { Review } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewList({ productId }: { productId: string }) {
    const { data: reviews, isLoading } =
        useGetAllReviewsOfProductQuery(productId);

    if (isLoading) {
        return (
            <div className="mt-10 space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="mt-10 text-gray-500 text-center">
                No reviews yet. Be the first to write one!
            </div>
        );
    }

    return (
        <section className="max-w-3xl mx-auto mt-12 px-4">
            <h3 className="text-2xl font-bold mb-6 text-center sm:text-left">
                Customer Reviews
            </h3>

            <div className="space-y-6">
                {reviews.map((review: Review) => (
                    <div
                        key={review.id}
                        className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-700"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
