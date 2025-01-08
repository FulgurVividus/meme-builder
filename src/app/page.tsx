"use client";

import { Button } from "@/components/ui/button";
import { IKImage, IKUpload } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "./providers";

function Home() {
  const [filePath, setFilePath] = useState("");

  return (
    <>
      <div className="">
        <Button variant={"destructive"}>Click me</Button>

        {filePath && (
          <IKImage
            path={filePath}
            width={300}
            height={500}
            urlEndpoint={urlEndpoint}
            transformation={[{ raw: "l-text,i-hello world,fs-30,l-end" }]}
            alt="meme"
          />
        )}

        <div>
          <h2>File upload</h2>
        </div>
      </div>
    </>
  );
}

export default Home;
