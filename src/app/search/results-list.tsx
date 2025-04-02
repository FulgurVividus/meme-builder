"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { urlEndpoint } from "../providers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { removeMemeAction } from "./actions";
import { useState } from "react";

export default function ResultsList({
  files,
  counts,
}: {
  files: FileObject[];
  counts: { memeId: string; count: number }[];
}) {
  const [memeList, setMemeList] = useState<FileObject[]>(files);

  async function handleRemoveMeme(fileId: string): Promise<void> {
    try {
      await removeMemeAction(fileId);
      setMemeList((prev) => prev.filter((meme) => meme.fileId !== fileId));
    } catch (error) {
      const errorHappen = error as Error;
      console.log(`Cannot remove the meme: ${errorHappen.message}`);
      alert(`Cannot remove the meme: ${errorHappen.message}`);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {memeList?.map((file) => (
          <Card key={file.fileId}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>{file.customMetadata?.displayName ?? file.name} </div>

                <div className="flex items-center gap-1">
                  <HeartFilledIcon />
                  {counts.find((c) => c.memeId === file.fileId)?.count ?? 0}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IKImage
                path={file.filePath}
                urlEndpoint={urlEndpoint}
                alt={file.name}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button asChild>
                <Link href={`/customize/${file.fileId}`}>Customize</Link>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => handleRemoveMeme(file.fileId)}
              >
                <TrashIcon className="text-red-600" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
