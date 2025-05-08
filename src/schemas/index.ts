/** @format */

import { z } from "zod";

export const CategoryEnum = z.enum([
    "ELECTRONICS",
    "FASHION",
    "GROCERY",
    "BOOKS",
    "HOME",
    "TOYS",
]);

export const OrderStatusEnum = z.enum([
    "CONFIRMED",
    "PENDING",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
]);

export const PaymentStatusEnum = z.enum(["PAID", "UNPAID"]);

export const ReviewSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    productId: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string(),
    image: z.string().url().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const ShippingAddressSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    division: z.string().min(1),
    district: z.string().min(1),
    upzila: z.string().min(1),
    postalCode: z.string().min(4).max(10),
    phoneNumber: z.string().min(10).max(15),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const OrderSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    shippingAddressId: z.string(),
    productId: z.array(z.string()),
    quantity: z.number().int().positive(),
    totalAmount: z.number().positive(),
    orderStatus: OrderStatusEnum.optional(),
    paymentStatus: PaymentStatusEnum.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const userIdSchema = z.string();

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Notification Settings Schema
export const notificationSettingsSchema = z.object({
    pushNotifications: z.boolean(),
    emailAlerts: z.boolean(),
    smsAlerts: z.boolean(),
    notificationFrequency: z.enum(["immediate", "daily", "weekly"]),
});

export type NotificationSettingsFormData = z.infer<
    typeof notificationSettingsSchema
>;

export const reviewSchema = z.object({
    rating: z.number().min(1, "Rating is required"),
    comment: z.string().min(5, "Comment must be at least 5 characters long"),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
