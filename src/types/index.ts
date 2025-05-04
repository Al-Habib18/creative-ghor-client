/** @format */

export type Product = {
    id: string;
    userId: string;
    name: string;
    description: string;
    price: number;
    discount: number; // Discount percentage (e.g., 5 means 5% off)
    category: "FASHION" | "ELECTRONICS" | "GROCERY" | "BOOKS" | "HOME" | "TOYS"; // You can expand this list based on your categories
    image: string; // Array of image URLs
    stock: number; // Quantity of the product in stock
    rating: number; // Product rating (e.g., 4.2)
    reviewsCount: number; // Number of reviews
};

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};
