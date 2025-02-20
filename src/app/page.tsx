import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MemeIt | Home",
  description: "Home page, where you can view various memes",
};

function Home() {
  redirect("/search?q=");

  return (
    <>
      <div></div>
    </>
  );
}

export default Home;
