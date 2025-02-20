import { unstable_noStore } from "next/cache";
import { getFavorites } from "./loaders";
import FavoritesList from "./favorites-list";
import noDataImg from "../../../public/no-data.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Favorites page, the memes that you liked",
};

export default async function FavoritesPage() {
  unstable_noStore();

  const favorites = await getFavorites();

  return (
    <>
      <div className="container mx-auto space-y-8 py-8 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>

        {favorites.length === 0 && (
          <Card className="flex flex-col items-center justify-center gap-4 py-8">
            <Image
              src={noDataImg}
              width={200}
              height={200}
              alt="An empty state image"
            />
            <p>You haven&apos;t favorited any memes</p>
            <Button asChild>
              <Link href={`/search?q=`}>Find some Memes</Link>
            </Button>
          </Card>
        )}

        {favorites.length > 0 && <FavoritesList favorites={favorites} />}
      </div>
    </>
  );
}
