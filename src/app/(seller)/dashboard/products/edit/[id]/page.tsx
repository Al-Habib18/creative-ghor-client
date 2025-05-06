/** @format */
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import {
    useGetSingleProductQuery,
    useUpdateProductMutation,
} from "@/state/productApi";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { ProductFormData, ProductSchema } from "@/schemas/product";

export default function ProductUpdatePage() {
    const { id } = useParams();
    const router = useRouter();
    const {
        data: product,
        isLoading,
        error,
    } = useGetSingleProductQuery(id as string);
    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                category: product.category,
                stock: product.stock,
            });
            setImagePreview(product.image);
        }
    }, [product, reset]);

    const onSubmit = async (values: ProductFormData) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await updateProduct({
                id: id as string,
                data: formData,
            }).unwrap();

            toast.success("Product updated successfully");
            router.push(`/dashboard/products/${id}`);
        } catch (err) {
            console.error("Update failed", err);
            toast.error("Failed to update product");
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading...</p>;
    if (error || !product)
        return (
            <p className="text-center text-red-500 py-10">
                Error loading product
            </p>
        );

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-800 dark:text-white">
                Update Product
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg"
            >
                {/* Product Name */}
                <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="Product name" {...register("name")} />
                    {errors.name && (
                        <p className="text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea {...register("description")} />
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
                        {errors.discount && (
                            <p className="text-sm text-red-500">
                                {errors.discount.message}
                            </p>
                        )}
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
                                        <SelectValue placeholder="Select category" />
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
                                            <SelectItem key={cat} value={cat}>
                                                {cat[0] +
                                                    cat.slice(1).toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && (
                            <p className="text-sm text-red-500">
                                Please select a category
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
                            alt="Preview"
                            width={150}
                            height={150}
                            className="rounded mt-2 object-cover w-32 h-32"
                        />
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-6">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push(`/dashboard/products/${id}`)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Product"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
