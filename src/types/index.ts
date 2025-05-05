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
    stock: number;
};

export type Order = {
    id: string | null;
    shippingAddressId: string | null;
    productIds: string[];
    quantity: number;
    totalAmount: number;
};

export type ShippingAddress = {
    id: string | null;
    userId: string;
    division: string;
    district: string;
    upzila: string;
    postalCode: string;
    phoneNumber: string;
};
