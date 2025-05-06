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

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-16 transition-colors duration-300">
            <div className="container mx-auto max-w-3xl px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                        Get in Touch with Us
                    </h1>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                        Whether you have questions, feedback, or just want to
                        say hi — we are here to help.
                    </p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8 rounded-xl shadow-md"
                >
                    {success ? (
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md text-center mb-6">
                            <p>Your message has been successfully sent!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-block bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-medium px-6 py-3 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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
