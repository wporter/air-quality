import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import TestButton from "@/components/TestButton";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(options);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Authenticated successfully!</p>
      <>
        <p>{`You are signed in as ${
          session && session.user
            ? JSON.stringify(session.user.name)
            : "No idea"
        }!`}</p>
        <Image src={session.user.image} width={"80"} height={"80"} />
        <TestButton signedin={true} />
      </>
    </div>
  );
};

export default async function Home() {
  return (
    <ProtectedPage
      fallback={<p>Checking Authentication...</p>}
      unauthenticatedComponent={
        <>
          <p>You are not signed in. </p>
          <TestButton signedin={false} />
        </>
      }
    >
      <Page />
    </ProtectedPage>
  );
}
