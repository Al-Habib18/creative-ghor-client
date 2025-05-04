/** @format */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ProductSchema, ProductFormData } from "@/schemas/product";
import { useGetAllProductsOfSellerQuery } from "@/state/sellerApi";
import { Product } from "@/types";
import Image from "next/image";
import ProductCard from "@/components/seller/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clerk } from "@clerk/clerk-js";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // or your preferred toast lib

const ProductsPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const sellerId = "user_2voHpnu85ucRij9yhq9ahq4NA5D";

    // Fetch products using the query hook
    const {
        data: products,
        error,
        isLoading,
    } = useGetAllProductsOfSellerQuery({
        id: sellerId,
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        if (!imageFile) {
            toast.error("Please upload a product image.");
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });
        formData.append("image", imageFile);

        try {
            const token = await window.Clerk?.session?.getToken();
            if (!token) {
                toast.error("Unauthorized! Please log in.");
                return;
            }

            const response = await fetch("http://localhost:4000/api/products", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(
                    responseData.message || "Something went wrong!"
                );
            }

            // Adding the new product to the list
            products?.unshift(responseData.data); // Unshift to add the product at the beginning
            reset();
            setImageFile(null);
            setImagePreview(null);
            setShowForm(false);
            setIsUploading(false);
            toast.success("Product created successfully!");
        } catch (err) {
            console.error("Product creation failed:", err);
            toast.error("Failed to create product. Please try again.");
        }
    };
    // Handle loading and error states
    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">Failed to load products.</p>;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Products</h1>
                <Button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Cancel" : "Add New Product"}
                </Button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow"
                >
                    {/* Product Name */}
                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input
                            placeholder="Enter product name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Product Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Write a short description"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Price and Discount */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Price ($)</Label>
                            <Input
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Discount (%)</Label>
                            <Input
                                type="number"
                                {...register("discount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </div>

                    {/* Category and Stock */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                "ELECTRONICS",
                                                "FASHION",
                                                "GROCERY",
                                                "BOOKS",
                                                "HOME",
                                                "TOYS",
                                            ].map((cat) => (
                                                <SelectItem
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat[0] +
                                                        cat
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Stock</Label>
                            <Input
                                type="number"
                                {...register("stock", { valueAsNumber: true })}
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500">
                                    {errors.stock.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>Product Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setImageFile(file);
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {imagePreview && (
                            <Image
                                src={imagePreview}
                                width={200}
                                height={200}
                                alt="Preview"
                                className="mt-2 rounded object-cover w-32 h-32"
                            />
                        )}
                    </div>

                    <Button type="submit" disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Submit Product"}
                    </Button>
                </form>
            )}

            {/* Display Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
