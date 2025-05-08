/** @format */

import { Star, StarHalf } from "lucide-react";

function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    size={16}
                    fill="currentColor"
                    stroke="none"
                />
            ))}

            {/* Half star */}
            {hasHalf && (
                <StarHalf size={16} className="fill-current text-yellow-400" />
            )}

            {/* Empty outlined stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    size={16}
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-300 dark:text-zinc-600"
                />
            ))}
        </div>
    );
}

export default renderStars;
