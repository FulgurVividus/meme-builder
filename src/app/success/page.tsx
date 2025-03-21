"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [downloaded, setDownloaded] = useState<boolean>(false);

  useEffect(
    function () {
      if (downloaded) return;

      const downloadImage = async () => {
        const src = localStorage.getItem("memeSrc");

        if (!src) return;

        const imageResponse = await fetch(src);
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = "meme.png";
        a.click();

        URL.revokeObjectURL(imageUrl);
        localStorage.removeItem("memeSrc");
        setDownloaded(true);
      };

      downloadImage();
    },
    [downloaded]
  );

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order is being processed.
      </p>

      <Link href={"/search?q="} className="text-blue-600 hover:underline">
        Continue to meme
      </Link>
    </div>
  );
};

export default Page;
