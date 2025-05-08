/** @format */

import Link from "next/link";

interface ErrorMessageProps {
    message?: string;
    showHomeLink?: boolean;
}

const ErrorMessage = ({
    message = "Something went wrong.",
    showHomeLink = true,
}: ErrorMessageProps) => {
    return (
        <div className="text-center min-h-screen py-6 px-4 max-w-md mx-auto">
            <h2 className="text-3xl font-semibold  mb-2">{message}</h2>
            {showHomeLink && (
                <Link
                    href="/"
                    className="inline-block mt-2 text-sm text-blue-600 hover:underline transition"
                >
                    &larr; Go back home
                </Link>
            )}
        </div>
    );
};

export default ErrorMessage;
