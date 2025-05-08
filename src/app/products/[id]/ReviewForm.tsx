/** @format */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useCreateReviewMutation } from "@/state/reviewApi";
import { toast } from "sonner";
import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ReviewSchema, reviewSchema } from "@/schemas";

export default function ReviewForm({ productId }: { productId: string }) {
    const { user } = useUser();
    const [addReview, { isLoading }] = useCreateReviewMutation();
    const [hovered, setHovered] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ReviewSchema>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    const rating = watch("rating");

    const onSubmit = async (data: ReviewSchema) => {
        if (!user) return;

        try {
            await addReview({
                productId,
                ...data,
            }).unwrap();

            toast.success("🎉 Review submitted successfully!");
            reset();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Try again!");
        }
    };

    if (!user) return null;

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 max-w-2xl mx-auto bg-background p-6 rounded-2xl shadow-md space-y-6 border"
        >
            <h3 className="text-2xl font-semibold">Leave a Review</h3>

            {/* Star Rating */}
            <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setValue("rating", star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            className="focus:outline-none"
                            aria-label={`Rate ${star} star${
                                star > 1 ? "s" : ""
                            }`}
                        >
                            <Star
                                className={`w-7 h-7 transition-colors ${
                                    star <= (hovered || rating)
                                        ? "fill-yellow-400 stroke-yellow-400"
                                        : "stroke-muted-foreground"
                                }`}
                            />
                        </button>
                    ))}
                </div>
                {errors.rating && (
                    <p className="text-sm text-destructive mt-1">
                        {errors.rating.message}
                    </p>
                )}
                <input
                    type="hidden"
                    {...register("rating", { valueAsNumber: true })}
                />
            </div>

            {/* Comment */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Comment
                </label>
                <textarea
                    rows={4}
                    {...register("comment")}
                    className="w-full p-3 rounded-md border bg-background text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    placeholder="Write your honest thoughts..."
                />
                {errors.comment && (
                    <p className="text-sm text-destructive mt-1">
                        {errors.comment.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <div className="pt-2">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Review"}
                </Button>
            </div>
        </motion.form>
    );
}
