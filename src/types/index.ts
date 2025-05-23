/** @format */
export enum CategoryEnum {
    ELECTRONICS = "ELECTRONICS",
    FASHION = "FASHION",
    GROCERY = "GROCERY",
    BOOKS = "BOOKS",
    HOME = "HOME",
    TOYS = "TOYS",
}
export enum OrderStatusEnum {
    ALL = "ALL",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export enum PaymentStatusEnum {
    ALL = "ALL",
    PAID = "PAID",
    UNPAID = "UNPAID",
}
export interface Product {
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
}

export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

export interface Order {
    id?: string | null;
    userId?: string;
    shippingAddressId: string | null;
    productIds: string[];
    quantity: number;
    totalAmount: number;
    orderStatus?: string;
    paymentStatus?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Order_type {
    id: string;
    userId: string;
    shippingAddressId: string | null;
    productIds: string[];
    quantity: number;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
}

export type ShippingAddress = {
    id: string | null;
    userId: string;
    division: string;
    district: string;
    upzila: string;
    postalCode: string;
    phoneNumber: string;
};

export interface UserSettings {
    theme?: "light" | "dark";
    emailAlerts?: boolean;
    smsAlerts?: boolean;
    pushNotifications?: boolean;
    notificationFrequency?: "immediate" | "daily" | "weekly";
}

export interface User {
    userId: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    publicMetadata: {
        userType: "admin" | "seller" | "buyer";
    };
    privateMetadata: {
        settings?: UserSettings;
        defaultPaymentMethodId?: string;
        stripeCustomerId?: string;
    };
    unsafeMetadata: {
        bio?: string;
        urls?: string[];
    };
}

export type sortType = "asc" | "desc" | "";
