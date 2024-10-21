"use client";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

// will talk to local API
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function Home() {
  const [filePath, setFilePath] = useState("");

  return (
    <>
      <div className="">
        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          {filePath && (
            <IKImage
              path={filePath}
              width={300}
              height={500}
              transformation={[{ raw: "l-text,i-hello world,fs-30,l-end" }]}
              alt="meme"
            />
          )}

          <div>
            <h2>File upload</h2>
            <IKUpload
              fileName="test-upload.png"
              onError={(error) => {
                console.log(error);
              }}
              onSuccess={(response) => {
                console.log("success", response);
                setFilePath(response.filePath);
              }}
            />
          </div>
        </ImageKitProvider>
      </div>
    </>
  );
}

export default Home;
