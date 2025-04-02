"use server";

import { assertAuthenticated } from "@/lib/auth-utils";
import { imagekit } from "../_lib/image-kit";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeMemeAction(fileId: string) {
  const userId = await assertAuthenticated();

  if (!userId) {
    throw new Error(`UserId not found`);
  }

  imagekit.deleteFile(fileId);

  revalidatePath(`/search?q=`);
  redirect(`/search?q=`);
}
