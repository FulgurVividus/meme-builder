"use client";

import { redirect } from "next/navigation";

function Home() {
  redirect("/search?q=");

  return (
    <>
      <div></div>
    </>
  );
}

export default Home;
