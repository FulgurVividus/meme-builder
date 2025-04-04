import { imagekit } from "@/app/_lib/image-kit";
import { unstable_noStore } from "next/cache";
import { CustomizePanel } from "./customize-panel";
import { getFavoriteMeme } from "./loaders";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize meme",
  description: "Page where you can easily customize a meme",
};

export default async function CustomizePage({
  params,
}: {
  params: { fileId: string };
}) {
  unstable_noStore();

  const session = await auth();

  const file = await imagekit.getFileDetails(params.fileId);
  const isFavorited = session ? await getFavoriteMeme(params.fileId) : false;

  return (
    <>
      <div className="container mx-auto space-y-8 py-8 px-4">
        <CustomizePanel
          file={{
            filePath: file.filePath,
            name: file.name,
            fileId: file.fileId,
          }}
          isFavorited={isFavorited}
          isAuthenticated={!!session}
        />
      </div>
    </>
  );
}
