"use client";

import { urlEndpoint } from "@/app/providers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, "filePath" | "name">;
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");
  const [textOverlay1XPosition, setTextOverlay1XPosition] = useState<number>(0);
  const [textOverlay1YPosition, setTextOverlay1YXPosition] =
    useState<number>(0);

  const xPositionDecimal: number = textOverlay1XPosition / 100;
  const yPositionDecimal: number = textOverlay1YPosition / 100;

  const transformations = [];
  if (textOverlay1) {
    transformations.push({
      raw: `l-text,i-${textOverlay1},fs-15,ly-bw_mul_${yPositionDecimal.toFixed(
        2
      )},lx-bw_mul_${xPositionDecimal.toFixed(2)},l-end`,
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="textOverlay1">Text Overlay 1</Label>
            <Input
              id="textOverlay1"
              onChange={(e) => setTextOverlay1(e.target.value)}
              value={textOverlay1}
            />
          </div>

          {/* X - position */}
          <div className="space-y-2">
            <Label htmlFor="text1XPosition">Text 1 X-Position</Label>
            <Slider
              id="text1XPosition"
              value={[textOverlay1XPosition]}
              onValueChange={([v]) => setTextOverlay1XPosition(v)}
            />
          </div>

          {/* Y - position */}
          <div className="space-y-2">
            <Label htmlFor="text1YPosition">Text 1 Y-Position</Label>
            <Slider
              id="text1YPosition"
              value={[textOverlay1YPosition]}
              onValueChange={([v]) => setTextOverlay1YXPosition(v)}
            />
          </div>
        </form>

        <IKImage
          path={file.filePath}
          urlEndpoint={urlEndpoint}
          alt={file.name}
          transformation={transformations}
        />
      </div>
    </>
  );
}
