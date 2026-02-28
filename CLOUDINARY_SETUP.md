# Cloudinary Integration for Brandly

To enable profile picture and campaign asset uploads, follow these steps to integrate Cloudinary into the Brandly platform.

## 1. Setup Cloudinary Account

1. Create a free account at [Cloudinary](https://cloudinary.com/).
2. Get your **Cloud Name**, **API Key**, and **API Secret** from the Dashboard.

## 2. Environment Variables

Add the following to your `.env` files:

### Backend (`/backend/.env`)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`/frontend/main-app/.env.local`)

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=brandly_unsigned_preset
```

## 3. Frontend Implementation (Unsigned Upload)

For client-side uploads, create an unsigned upload preset in Cloudinary settings.

### Upload Component Example

```javascript
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data.secure_url;
};
```

## 4. Backend Implementation (Node.js SDK)

Install `cloudinary` package: `npm install cloudinary`

```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use cloudinary.uploader.upload(file_path) for server-side uploads
```

## 5. Security Note

- Use **Signed Uploads** for sensitive campaign assets.
- Implement **Webhooks** if you need to perform post-processing (e.g., AI analysis of images).
