import ImageKit from "imagekit";
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
      <div className="container mx-auto space-y-8 py-8">
        <h1 className="text-4xl font-bold">Search Results</h1>

        <ResultsList files={files} />
      </div>
    </>
  );
}
