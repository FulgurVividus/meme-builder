"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TwitterPicker } from "react-color";

export function TextOverlay({
  onUpdate,
  index,
}: {
  onUpdate: (
    index: number,
    text: string,
    x: number,
    y: number,
    bgColor?: string
  ) => void;
  index: number;
}) {
  const [textOverlay, setTextOverlay] = useState<string>("");
  const [textOverlayXPosition, setTextOverlayXPosition] = useState<number>(0);
  const [textOverlayYPosition, setTextOverlayYXPosition] = useState<number>(0);
  const [applyTextBackground, setApplyTextBackground] =
    useState<boolean>(false);
  const [textBgColor, setTextBgColor] = useState<string>("#FFFFFF");

  const xPositionDecimal: number = textOverlayXPosition / 100;
  const yPositionDecimal: number = textOverlayYPosition / 100;
  const bgColor = applyTextBackground
    ? textBgColor.replace("#", "")
    : undefined;

  const transformations = [];
  if (textOverlay) {
    transformations.push({
      raw: `l-text,i-${textOverlay},fs-15,ly-bw_mul_${yPositionDecimal.toFixed(
        2
      )},lx-bw_mul_${xPositionDecimal.toFixed(2)},l-end`,
    });
  }

  useEffect(
    function () {
      onUpdate(
        index,
        textOverlay || " ",
        xPositionDecimal,
        yPositionDecimal,
        bgColor
      );
    },
    [index, textOverlay, xPositionDecimal, yPositionDecimal, bgColor, onUpdate]
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between gap-8">
        <div className="flex-grow">
          <Label htmlFor={`textOverlay${index}`} className="font-semibold">
            Text Overlay {index}
          </Label>
          <Input
            id={`textOverlay${index}`}
            onChange={(e) => {
              setTextOverlay(e.target.value);
              onUpdate(
                index,
                e.target.value,
                xPositionDecimal,
                yPositionDecimal,
                bgColor
              );
            }}
            value={textOverlay}
          />
        </div>

        <div className="flex items-center space-x-2 flex-col space-y-4">
          <div className="flex gap-4">
            <Checkbox
              onCheckedChange={(v) => {
                setApplyTextBackground(v as boolean);
                onUpdate(
                  index,
                  textOverlay,
                  xPositionDecimal,
                  yPositionDecimal,
                  applyTextBackground ? textBgColor.replace("#", "") : undefined
                );
              }}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply text background
            </label>
          </div>

          {applyTextBackground && (
            <TwitterPicker
              color={textBgColor}
              onChange={(value) => {
                setTextBgColor(value.hex);
                onUpdate(
                  index,
                  textOverlay,
                  xPositionDecimal,
                  yPositionDecimal,
                  applyTextBackground ? value.hex.replace("#", "") : undefined
                );
              }}
            />
          )}
        </div>
      </div>

      {/* X - position */}
      <div className="space-y-2">
        <Label htmlFor={`text${index}XPosition`} className="font-semibold">
          Text {index} (X - Position)
        </Label>
        <Slider
          id={`text${index}XPosition`}
          value={[textOverlayXPosition]}
          onValueChange={([v]) => {
            setTextOverlayXPosition(v);
            onUpdate(index, textOverlay, v / 100, yPositionDecimal, bgColor);
          }}
        />
      </div>

      {/* Y - position */}
      <div className="space-y-2">
        <Label htmlFor={`text${index}YPosition`} className="font-semibold">
          Text {index} (Y - Position)
        </Label>
        <Slider
          id={`text${index}YPosition`}
          value={[textOverlayYPosition]}
          onValueChange={([v]) => {
            setTextOverlayYXPosition(v);
            onUpdate(index, textOverlay, xPositionDecimal, v / 100, bgColor);
          }}
        />
      </div>
    </Card>
  );
}
