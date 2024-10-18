"use client";

import React from "react";
import { IKImage } from "imagekitio-next";

function Home() {
  return (
    <>
      <div className="">
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          path="ballon-meme.jpg"
          width={300}
          height={500}
          transformation={[{ raw: "l-text,i-hello world,fs-80,l-end" }]}
          alt="meme"
        />
      </div>
    </>
  );
}

export default Home;
