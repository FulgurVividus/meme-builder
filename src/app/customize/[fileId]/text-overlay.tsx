"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function TextOverlay({
  onUpdate,
  index,
}: {
  onUpdate: (text: string, x: number, y: number) => void;
  index: number;
}) {
  const [textOverlay, setTextOverlay] = useState<string>("");
  const [textOverlayXPosition, setTextOverlayXPosition] = useState<number>(0);
  const [textOverlayYPosition, setTextOverlayYXPosition] = useState<number>(0);

  const xPositionDecimal: number = textOverlayXPosition / 100;
  const yPositionDecimal: number = textOverlayYPosition / 100;

  const transformations = [];
  if (textOverlay) {
    transformations.push({
      raw: `l-text,i-${textOverlay},fs-15,ly-bw_mul_${yPositionDecimal.toFixed(
        2
      )},lx-bw_mul_${xPositionDecimal.toFixed(2)},l-end`,
    });
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`textOverlay${index}`} className="font-semibold">
          Text Overlay {index}
        </Label>
        <Input
          id={`textOverlay${index}`}
          onChange={(e) => {
            setTextOverlay(e.target.value);
            onUpdate(e.target.value, xPositionDecimal, yPositionDecimal);
          }}
          value={textOverlay}
        />
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
            onUpdate(textOverlay, v / 100, yPositionDecimal);
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
            onUpdate(textOverlay, xPositionDecimal, v / 100);
          }}
        />
      </div>
    </Card>
  );
}
