/** @format */

"use client";

import { useState } from "react";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const res = await fetch("http://localhost:4000/api/upload", {
                method: "POST",
                body: formData, // No Content-Type set here!
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(`File uploaded: ${data.file.filename}`);
            } else {
                setMessage("Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Upload error. Check console.");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto min-h-screen border rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Upload a File</h2>
            <input type="file" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Upload
            </button>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </div>
    );
};

export default FileUpload;
