"use server";

import { db } from "@/app/db/db";
import { favoriteCounts, favorites } from "@/app/db/schema";
import { assertAuthenticated } from "@/lib/auth-utils";
import { stripe } from "@/lib/stripe";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//
export async function toggleFavoriteMemeAction(
  fileId: string,
  filePath: string,
  pathToRevalidate: string
) {
  const userId = await assertAuthenticated();

  const favorite = await db.query.favorites.findFirst({
    where: and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)),
  });

  if (favorite) {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));

    await db
      .update(favoriteCounts)
      .set({
        count: sql`${favoriteCounts.count} - 1`,
      })
      .where(eq(favoriteCounts.memeId, fileId));
  } else {
    await db.insert(favorites).values({
      userId,
      memeId: fileId,
      filePath: filePath,
    });

    await db
      .insert(favoriteCounts)
      .values({
        memeId: fileId,
        count: 1,
      })
      .onConflictDoUpdate({
        set: {
          count: sql`${favoriteCounts.count} + 1`,
        },
        target: favoriteCounts.memeId,
      });
  }

  revalidatePath(pathToRevalidate);
}

// payment
export async function paymentAction(formData: FormData): Promise<void> {
  const price = Number(formData.get("price"));

  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: "Pay for meme" },
        unit_amount: price * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
  });

  redirect(session.url!);
}
