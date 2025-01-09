"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function TextOverlay({
  onUpdate,
}: {
  onUpdate: (text: string, x: number, y: number) => void;
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
        <Label htmlFor="textOverlay1" className="font-semibold">
          Text Overlay 1
        </Label>
        <Input
          id="textOverlay1"
          onChange={(e) => {
            setTextOverlay(e.target.value);
            onUpdate(e.target.value, xPositionDecimal, yPositionDecimal);
          }}
          value={textOverlay}
        />
      </div>

      {/* X - position */}
      <div className="space-y-2">
        <Label htmlFor="text1XPosition" className="font-semibold">
          Text 1 (X - Position)
        </Label>
        <Slider
          id="text1XPosition"
          value={[textOverlayXPosition]}
          onValueChange={([v]) => {
            setTextOverlayXPosition(v);
            onUpdate(textOverlay, v / 100, yPositionDecimal);
          }}
        />
      </div>

      {/* Y - position */}
      <div className="space-y-2">
        <Label htmlFor="text1YPosition" className="font-semibold">
          Text 1 (Y - Position)
        </Label>
        <Slider
          id="text1YPosition"
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
