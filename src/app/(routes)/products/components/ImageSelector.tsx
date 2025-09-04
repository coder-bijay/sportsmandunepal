"use client";

import Image from "next/image";
import { useState } from "react";

const ImageSelector = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-2 mb-4">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            width={48}
            height={48}
            alt={`thumbnail-${idx}`}
            className={`w-12 h-12 object-cover rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
              selectedImage === img
                ? "ring-2 ring-green-600 border border-green-600"
                : "border border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      <div className="w-80 h-80 border rounded overflow-hidden relative bg-white shadow-sm">
        <Image
          key={selectedImage}
          width={320}
          height={320}
          src={selectedImage}
          alt="Selected Product"
          className={`w-full h-full object-cover transition-opacity duration-300 ease-out`}
          priority
        />
      </div>
    </div>
  );
};

export default ImageSelector;
