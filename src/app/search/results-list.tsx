"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { urlEndpoint } from "../providers";

export default function ResultsList({ files }: { files: FileObject[] }) {
  return (
    <>
      <div>
        {files?.map((file) => {
          return (
            <IKImage
              key={file.fileId}
              path={file.filePath}
              urlEndpoint={urlEndpoint}
              alt={file.name}
              width={300}
              height={300}
            />
          );
        })}
      </div>
    </>
  );
}
