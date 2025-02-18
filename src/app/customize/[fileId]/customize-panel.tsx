/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { urlEndpoint } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { debounce } from "lodash";
import { Download } from "lucide-react";
import { useCallback, useState } from "react";
import { TextOverlay } from "./text-overlay";
import FavoriteButton from "./favorite-button";

export function CustomizePanel({
  file,
  isFavorited,
  isAuthenticated,
}: {
  file: Pick<FileObject, "filePath" | "name" | "fileId">;
  isFavorited: boolean;
  isAuthenticated: boolean;
}) {
  const [textTransformations, setTextTransformations] = useState<
    Record<string, { raw: string }>
  >({});
  const [numberOfOverlays, setNumberOfOverlays] = useState<number>(1);
  const [blur, setBlur] = useState<boolean>(false);
  const [sharpen, setSharpen] = useState<boolean>(false);
  const [grayscale, setGrayscale] = useState<boolean>(false);

  const textTransformationsArray = Object.values(textTransformations);

  const onUpdate = useCallback(
    debounce(
      (index: number, text: string, x: number, y: number, bgColor?: string) => {
        setTextTransformations((current) => ({
          ...current,
          [`text${index}`]: {
            raw: `l-text,i-${text ?? " "},${
              bgColor ? `bg-${bgColor},pa-10,` : ""
            }fs-15,ly-bw_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
          },
        }));
      },
      250
    ),
    []
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Customize</h1>

        <div className="flex items-center justify-end gap-4">
          {/* Favorite button */}
          {isAuthenticated && (
            <FavoriteButton
              fileId={file.fileId}
              filePath={file.filePath}
              isFavorited={isFavorited}
              pathToRevalidate={`/customize/${file.fileId}`}
            />
          )}

          {/* Download button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={async () => {
                    const image = document.querySelector("#meme img");
                    const src = image?.getAttribute("src");

                    if (!src) return;
                    const imageResponse = await fetch(src);
                    const imageBlob = await imageResponse.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    const a = document.createElement("a");
                    a.href = imageUrl;
                    a.download = file.name;
                    a.click();
                  }}
                >
                  <Download />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download the meme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Card className="p-4 space-y-4">
              <h2 className="text-xl">Effects</h2>

              <div className="flex items-center flex-wrap gap-4">
                <div className="flex gap-2">
                  <Checkbox
                    checked={blur}
                    onCheckedChange={(v) => {
                      setBlur(v as boolean);
                    }}
                    id="blur"
                  />
                  <label
                    htmlFor="blur"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Blur
                  </label>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    checked={sharpen}
                    onCheckedChange={(v) => {
                      setSharpen(v as boolean);
                    }}
                    id="sharpen"
                  />
                  <label
                    htmlFor="sharpen"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sharpen
                  </label>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    checked={grayscale}
                    onCheckedChange={(v) => {
                      setGrayscale(v as boolean);
                    }}
                    id="grayscale"
                  />
                  <label
                    htmlFor="grayscale"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Grayscale
                  </label>
                </div>
              </div>
            </Card>
          </div>

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

            {numberOfOverlays > 1 && (
              <Button
                variant={"destructive"}
                onClick={() => {
                  setNumberOfOverlays(numberOfOverlays - 1);
                  const lastIndex = numberOfOverlays - 1;
                  setTextTransformations((curr) => {
                    const newCurr = { ...curr };
                    delete newCurr[`text${lastIndex}`];
                    return newCurr;
                  });
                }}
              >
                Remove Last
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div id="meme">
            <IKImage
              path={file.filePath}
              urlEndpoint={urlEndpoint}
              alt={file.name}
              transformation={
                [
                  blur ? { raw: "bl-3" } : undefined,
                  sharpen ? { raw: "e-sharpen-10" } : undefined,
                  grayscale ? { raw: "e-grayscale" } : undefined,
                  ...textTransformationsArray,
                ].filter(Boolean) as any
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
