/** @format */

import { Star, StarHalf, StarOff } from "lucide-react";

function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    size={16}
                    fill="currentColor"
                    stroke="none"
                />
            ))}
            {hasHalf && <StarHalf size={16} />}
            {[...Array(emptyStars)].map((_, i) => (
                <StarOff key={`empty-${i}`} size={16} />
            ))}
        </div>
    );
}

export default renderStars;
