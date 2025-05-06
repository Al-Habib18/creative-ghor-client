/** @format */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (replace with your API logic)
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 py-12">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                        Get in Touch with Us
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
                        We are here to help! Whether you have a question,
                        suggestion, or need support, feel free to reach out.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-xl mx-auto"
                >
                    {success ? (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md text-center mb-8">
                            <p>Your message has been successfully sent!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-lg font-medium text-zinc-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-2 p-3 w-full border rounded-md text-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-medium text-zinc-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-2 p-3 w-full border rounded-md text-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-lg font-medium text-zinc-900 dark:text-white"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="mt-2 p-3 w-full border rounded-md text-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500"
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm focus:outline-none disabled:bg-emerald-300"
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
