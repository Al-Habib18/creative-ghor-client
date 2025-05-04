/** @format */

import { z } from "zod";

export const ProductSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long" })
        .max(100, { message: "Product name must be less than 100 characters" }),

    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must be less than 500 characters" }),

    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .min(0.01, { message: "Price must be at least $0.01" }),

    discount: z
        .number()
        .min(0, { message: "Discount must be between 0 and 100" })
        .max(100, { message: "Discount must be between 0 and 100" })
        .optional(),

    category: z.enum(
        ["ELECTRONICS", "FASHION", "GROCERY", "BOOKS", "HOME", "TOYS"],
        {
            errorMap: () => ({ message: "Please select a category" }),
        }
    ),

    stock: z
        .number()
        .int({ message: "Stock must be an integer" })
        .min(0, { message: "Stock must be a positive integer" }),

    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
            message: "Product image is required",
        })
        .optional(),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
