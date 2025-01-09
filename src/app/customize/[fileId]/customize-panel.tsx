"use client";

import { urlEndpoint } from "@/app/providers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, "filePath" | "name">;
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");

  const transformations = [];
  if (textOverlay1) {
    transformations.push({ raw: `l-text,i-${textOverlay1},fs-10,l-end` });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <form action="">
          <Label htmlFor="textOverlay1">Text Overlay 1</Label>
          <Input
            id="textOverlay1"
            onChange={(e) => setTextOverlay1(e.target.value)}
            value={textOverlay1}
          />
        </form>

        <IKImage
          path={file.filePath}
          urlEndpoint={urlEndpoint}
          alt={file.name}
          width={300}
          height={300}
          transformation={transformations}
        />
      </div>
    </>
  );
}
