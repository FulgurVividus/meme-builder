"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IKUpload } from "imagekitio-next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadMemeButton() {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload Base Meme</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your meme image</DialogTitle>
            <DialogDescription>
              This is a meme image anyone on the site can build upon it.
            </DialogDescription>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploading(true);
                // manually invoke the ikupload and pass the displayName as metadata
                uploadInputRef.current?.click();
              }}
            >
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />

                <IKUpload
                  fileName="test-upload.png"
                  customMetadata={{ displayName }}
                  onError={(error) => {
                    setIsUploading(false);
                    console.log(error);
                  }}
                  onSuccess={(response) => {
                    setIsUploading(false);
                    router.push(`/customize/${response.fileId}`);
                  }}
                  style={{ display: "none" }}
                  ref={uploadInputRef}
                />
              </div>

              <DialogFooter className="flex justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={isUploading}>
                  {isUploading && <Spinner />}
                  Select & Upload Image
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
