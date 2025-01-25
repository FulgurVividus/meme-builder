"use client";

import { urlEndpoint } from "@/app/providers";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useCallback, useState } from "react";
import { TextOverlay } from "./text-overlay";
import { Button } from "@/components/ui/button";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, "filePath" | "name">;
}) {
  const [transformations, setTransformations] = useState<
    Record<string, { raw: string }>
  >({});
  const [numberOfOverlays, setNumberOfOverlays] = useState<number>(1);

  const transformationsArray = Object.values(transformations);

  const onUpdate = useCallback(
    (index: number, text: string, x: number, y: number, bgColor?: string) => {
      if (text) {
        setTransformations((current) => ({
          ...current,
          [`text${index}`]: {
            raw: `l-text,i-${text ?? " "},${
              bgColor ? `bg-${bgColor},pa-10,` : ""
            }fs-15,ly-bw_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
          },
        }));
      }
    },
    []
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {new Array(numberOfOverlays).fill("").map((_, index) => (
            <TextOverlay key={index} index={index + 1} onUpdate={onUpdate} />
          ))}

          <div className="flex gap-4">
            <Button
              onClick={() => {
                setNumberOfOverlays(numberOfOverlays + 1);
              }}
            >
              Add Another Overlay
            </Button>

            <Button
              variant={"destructive"}
              onClick={() => {
                setNumberOfOverlays(numberOfOverlays - 1);
                const lastIndex = numberOfOverlays - 1;
                setTransformations((curr) => {
                  const newCurr = { ...curr };
                  delete newCurr[`text${lastIndex}`];
                  return newCurr;
                });
              }}
            >
              Remove Last
            </Button>
          </div>
        </div>

        <IKImage
          path={file.filePath}
          urlEndpoint={urlEndpoint}
          alt={file.name}
          transformation={transformationsArray}
        />
      </div>
    </>
  );
}
