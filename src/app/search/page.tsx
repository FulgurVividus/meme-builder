import ImageKit from "imagekit";
import { IKImage } from "imagekitio-next";
import { unstable_noStore } from "next/cache";
import ResultsList from "./results-list";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
  privateKey: process.env.PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
});

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  unstable_noStore();

  const files = await imagekit.listFiles({
    searchQuery: `name:${searchParams.q}`,
  });

  return (
    <>
      <div>
        <ResultsList files={files} />
      </div>
    </>
  );
}
