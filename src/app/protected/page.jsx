"use client";
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/"}>Back</Link>
      <p>Authenticated!</p>
      <>
        <p>{`You are signed in as ${
          session && session.user
            ? JSON.stringify(session.user.name)
            : "No idea"
        }!`}</p>
        <Image src={session.user.image} width={"80"} height={"80"} />
      </>
      <button
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <ProtectedPage fallback={<p>Checking Authentication...</p>}>
      <Page />
    </ProtectedPage>
  );
}
