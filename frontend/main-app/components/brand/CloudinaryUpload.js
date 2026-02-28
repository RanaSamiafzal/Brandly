"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function CloudinaryUpload({
    onUploadSuccess,
    onUploadError,
    uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "profile_upload",
    buttonText = "Upload Image",
    className = "",
    folder = "brandly_assets"
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    return (
        <CldUploadWidget
            uploadPreset={uploadPreset}
            options={{
                sources: ['local', 'url', 'camera'],
                multiple: false,
                cropping: true,
                folder: folder,
                clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp', 'mp4'],
                maxFileSize: 10000000, // 10MB
            }}
            onSuccess={(result) => {
                setUploaded(true);
                setIsUploading(false);
                if (onUploadSuccess) onUploadSuccess(result.info);
            }}
            onOpen={() => setIsUploading(true)}
            onClose={() => setIsUploading(false)}
            onError={(error) => {
                const errorMsg = typeof error === 'object' ? JSON.stringify(error) : error;
                console.error("Cloudinary Upload Error Details:", errorMsg);
                setIsUploading(false);
                if (onUploadError) onUploadError(error);

                // Add useful hint for common configuration issues
                if (errorMsg.includes("DisabledCloud")) {
                    console.error("HINT: Cloud name might be inactive or incorrect in .env.local");
                } else if (!uploadPreset || uploadPreset === "ml_default") {
                    console.error("HINT: Ensure NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is set for unsigned uploads.");
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        disabled={isUploading}
                        className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-all ${className} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploaded ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Uploaded!</span>
                            </>
                        ) : isUploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                <span>{buttonText}</span>
                            </>
                        )}
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
